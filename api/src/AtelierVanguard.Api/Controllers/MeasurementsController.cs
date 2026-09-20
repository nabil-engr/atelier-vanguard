using System.Security.Claims;
using AtelierVanguard.Application.Measurements;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AtelierVanguard.Api.Controllers;

[ApiController, Route("api/v1/measurements"), Tags("Measurements")]
public sealed class MeasurementsController(IMeasurementService measurements) : ControllerBase
{
    [HttpGet] public async Task<IActionResult> Get(CancellationToken ct) => Ok(await measurements.GetAsync(UserId(), ct));
    [HttpGet("{id:guid}")] public async Task<IActionResult> Get(Guid id, CancellationToken ct)
    { var value = await measurements.GetByIdAsync(UserId(), id, ct); return value is null ? NotFound() : Ok(value); }
    [HttpPost] public async Task<IActionResult> Save(SaveMeasurementRequest request, CancellationToken ct)
    { var value = await measurements.SaveAsync(UserId(), request, ct); return CreatedAtAction(nameof(Get), new { id = value.Id }, value); }
    [HttpPut("{id:guid}")] public async Task<IActionResult> Update(Guid id, SaveMeasurementRequest request, CancellationToken ct)
    { var value = await measurements.UpdateAsync(UserId(), id, request, ct); return value is null ? NotFound() : Ok(value); }
    [HttpDelete("{id:guid}")] public async Task<IActionResult> Delete(Guid id, CancellationToken ct) =>
        await measurements.DeleteAsync(UserId(), id, ct) ? NoContent() : NotFound();
    private Guid UserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub")!);
}

[ApiController, Route("api/v1/admin/measurements"), Authorize(Roles = "Admin,SuperAdmin,Tailor"), Tags("Admin Measurements")]
public sealed class AdminMeasurementsController(IMeasurementService measurements) : ControllerBase
{
    public sealed record ReviewMeasurementRequest(bool Approved);
    [HttpGet("pending")] public async Task<IActionResult> Pending(CancellationToken ct) => Ok(await measurements.GetPendingAsync(ct));
    [HttpPatch("{id:guid}/review")] public async Task<IActionResult> Review(Guid id, ReviewMeasurementRequest request, CancellationToken ct)
    { var value = await measurements.ReviewAsync(id, request.Approved, ct); return value is null ? NotFound() : Ok(value); }
}
