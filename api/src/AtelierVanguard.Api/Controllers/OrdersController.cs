using System.Security.Claims;
using AtelierVanguard.Application.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AtelierVanguard.Api.Controllers;

[ApiController, Route("api/v1/orders"), Tags("Orders")]
public sealed class OrdersController(IOrderService orders) : ControllerBase
{
    [HttpGet] public async Task<IActionResult> Get(CancellationToken ct) => Ok(await orders.GetForCustomerAsync(UserId(), ct));
    [HttpGet("{id:guid}")] public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    { var value = await orders.GetForCustomerAsync(UserId(), id, ct); return value is null ? NotFound() : Ok(value); }
    [HttpPost] public async Task<IActionResult> Create(CreateOrderRequest request, CancellationToken ct)
    { var value = await orders.CreateAsync(UserId(), request, ct); return CreatedAtAction(nameof(Get), new { id = value.Id }, value); }
    [HttpPost("{id:guid}/cancel")] public async Task<IActionResult> Cancel(Guid id, CancellationToken ct) =>
        await orders.CancelAsync(UserId(), id, ct) ? NoContent() : NotFound();
    private Guid UserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub")!);
}

[ApiController, Route("api/v1/admin/orders"), Authorize(Policy = "Admin"), Tags("Admin Orders")]
public sealed class AdminOrdersController(IOrderService orders) : ControllerBase
{
    public sealed record UpdateOrderStatusRequest(string Status, string? Note);
    [HttpGet] public async Task<IActionResult> Get(CancellationToken ct) => Ok(await orders.GetAllAsync(ct));
    [HttpGet("{id:guid}")] public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    { var value = await orders.GetAsync(id, ct); return value is null ? NotFound() : Ok(value); }
    [HttpPatch("{id:guid}/status")] public async Task<IActionResult> UpdateStatus(Guid id, UpdateOrderStatusRequest request, CancellationToken ct)
    { var value = await orders.UpdateStatusAsync(id, request.Status, request.Note, ct); return value is null ? NotFound() : Ok(value); }
}
