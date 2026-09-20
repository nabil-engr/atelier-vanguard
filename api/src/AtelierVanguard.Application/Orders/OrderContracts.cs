using System.ComponentModel.DataAnnotations;

namespace AtelierVanguard.Application.Orders;

public sealed record CreateOrderItem(Guid ProductId, string ProductName, decimal UnitPrice, string ConfigurationJson);
public sealed record CreateOrderRequest([Required, MinLength(1), MaxLength(25)] IReadOnlyList<CreateOrderItem> Items,
    [Required, StringLength(3, MinimumLength = 3)] string Currency);
public sealed record OrderDto(Guid Id, string OrderNumber, string Status, decimal Total, string Currency,
    DateTime EstimatedDeliveryUtc, IReadOnlyList<CreateOrderItem> Items);

public interface IOrderService
{
    Task<OrderDto> CreateAsync(Guid customerId, CreateOrderRequest request, CancellationToken cancellationToken);
    Task<IReadOnlyList<OrderDto>> GetForCustomerAsync(Guid customerId, CancellationToken cancellationToken);
    Task<OrderDto?> GetForCustomerAsync(Guid customerId, Guid id, CancellationToken cancellationToken);
    Task<bool> CancelAsync(Guid customerId, Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<OrderDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<OrderDto?> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<OrderDto?> UpdateStatusAsync(Guid id, string status, string? note, CancellationToken cancellationToken);
}
