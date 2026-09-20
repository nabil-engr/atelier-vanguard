using AtelierVanguard.Domain.Orders;

namespace AtelierVanguard.Tests;

public class OrderTests
{
    [Fact]
    public void NewOrderStartsConfirmed()
    {
        var order = new Order
        {
            OrderNumber = "AV-TEST-1",
            CustomerId = Guid.NewGuid(),
            EstimatedDeliveryUtc = DateTime.UtcNow.AddDays(28)
        };

        Assert.Equal(OrderStatus.Confirmed, order.Status);
        Assert.Equal("USD", order.Currency);
    }
}
