using AtelierVanguard.Application.Orders;
using AtelierVanguard.Domain.Orders;
using AtelierVanguard.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AtelierVanguard.Infrastructure.Services;

public sealed class OrderService(AppDbContext db) : IOrderService
{
    public async Task<OrderDto> CreateAsync(Guid customerId, CreateOrderRequest request, CancellationToken ct)
    {
        if (request.Items.Count == 0) throw new ArgumentException("At least one item is required.");
        if (request.Items.Count > 25) throw new ArgumentException("An order cannot contain more than 25 items.");
        var productIds = request.Items.Select(x => x.ProductId).Distinct().ToList();
        var products = await db.Products.AsNoTracking().Where(x => productIds.Contains(x.Id) && x.IsPublished)
            .ToDictionaryAsync(x => x.Id, ct);
        if (products.Count != productIds.Count) throw new ArgumentException("One or more products are unavailable.");
        var items = request.Items.Select(x =>
        {
            var product = products[x.ProductId];
            return new OrderItem { ProductId = product.Id, ProductName = product.Name,
                UnitPrice = product.BasePrice, ConfigurationJson = x.ConfigurationJson };
        }).ToList();
        var order = new Order
        {
            CustomerId = customerId,
            OrderNumber = $"AV-{DateTime.UtcNow:yyyy}-{Random.Shared.Next(10000, 99999)}",
            Currency = request.Currency.Trim().ToUpperInvariant(),
            Total = items.Sum(x => x.UnitPrice),
            EstimatedDeliveryUtc = DateTime.UtcNow.AddDays(28),
            Items = items,
            History = [new OrderStatusHistory { Status = OrderStatus.Confirmed, Note = "Order confirmed" }]
        };
        db.Orders.Add(order);
        await db.SaveChangesAsync(ct);
        return Map(order);
    }

    public async Task<IReadOnlyList<OrderDto>> GetForCustomerAsync(Guid customerId, CancellationToken ct) =>
        (await db.Orders.AsNoTracking().Include(x => x.Items).Where(x => x.CustomerId == customerId)
            .OrderByDescending(x => x.CreatedAtUtc).ToListAsync(ct)).Select(Map).ToList();

    public async Task<OrderDto?> GetForCustomerAsync(Guid customerId, Guid id, CancellationToken ct)
    {
        var order = await db.Orders.AsNoTracking().Include(x => x.Items)
            .SingleOrDefaultAsync(x => x.Id == id && x.CustomerId == customerId, ct);
        return order is null ? null : Map(order);
    }

    public async Task<bool> CancelAsync(Guid customerId, Guid id, CancellationToken ct)
    {
        var order = await db.Orders.Include(x => x.History).SingleOrDefaultAsync(x => x.Id == id && x.CustomerId == customerId, ct);
        if (order is null) return false;
        if (order.Status is OrderStatus.Shipped or OrderStatus.Delivered or OrderStatus.Completed)
            throw new InvalidOperationException("This order can no longer be cancelled.");
        order.Status = OrderStatus.Cancelled;
        order.History.Add(new OrderStatusHistory { Status = OrderStatus.Cancelled, Note = "Cancelled by customer" });
        await db.SaveChangesAsync(ct); return true;
    }

    public async Task<IReadOnlyList<OrderDto>> GetAllAsync(CancellationToken ct) =>
        (await db.Orders.AsNoTracking().Include(x => x.Items).OrderByDescending(x => x.CreatedAtUtc)
            .ToListAsync(ct)).Select(Map).ToList();

    public async Task<OrderDto?> GetAsync(Guid id, CancellationToken ct)
    {
        var order = await db.Orders.AsNoTracking().Include(x => x.Items).SingleOrDefaultAsync(x => x.Id == id, ct);
        return order is null ? null : Map(order);
    }

    public async Task<OrderDto?> UpdateStatusAsync(Guid id, string status, string? note, CancellationToken ct)
    {
        if (!Enum.TryParse<OrderStatus>(status, true, out var next)) throw new ArgumentException("Invalid order status.");
        var order = await db.Orders.Include(x => x.Items).Include(x => x.History).SingleOrDefaultAsync(x => x.Id == id, ct);
        if (order is null) return null;
        order.Status = next;
        order.History.Add(new OrderStatusHistory { Status = next, Note = note?.Trim() ?? string.Empty });
        await db.SaveChangesAsync(ct); return Map(order);
    }

    private static OrderDto Map(Order x) => new(x.Id, x.OrderNumber, x.Status.ToString(), x.Total, x.Currency,
        x.EstimatedDeliveryUtc, x.Items.Select(i => new CreateOrderItem(i.ProductId, i.ProductName,
            i.UnitPrice, i.ConfigurationJson)).ToList());
}
