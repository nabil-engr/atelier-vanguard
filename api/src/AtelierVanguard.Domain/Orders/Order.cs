using AtelierVanguard.Domain.Common;

namespace AtelierVanguard.Domain.Orders;

public enum OrderStatus { Confirmed, MeasurementReview, FabricAllocated, Cutting, Tailoring, QualityControl, Packaging, Shipped, Delivered, Completed, Cancelled }

public sealed class Order : Entity
{
    public required string OrderNumber { get; set; }
    public required Guid CustomerId { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Confirmed;
    public decimal Total { get; set; }
    public string Currency { get; set; } = "USD";
    public DateTime EstimatedDeliveryUtc { get; set; }
    public List<OrderItem> Items { get; set; } = [];
    public List<OrderStatusHistory> History { get; set; } = [];
}

public sealed class OrderItem : Entity
{
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public required string ProductName { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; } = 1;
    public string ConfigurationJson { get; set; } = "{}";
}

public sealed class OrderStatusHistory : Entity
{
    public Guid OrderId { get; set; }
    public OrderStatus Status { get; set; }
    public string Note { get; set; } = string.Empty;
}
