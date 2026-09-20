using AtelierVanguard.Application.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AtelierVanguard.Api.Controllers;

[ApiController, Route("api/v1/admin"), Authorize(Policy = "Admin"), Tags("Admin")]
public sealed class AdminController(IAdminService admin) : ControllerBase
{
    [HttpGet("dashboard")] public async Task<IActionResult> Dashboard(CancellationToken ct) => Ok(await admin.GetDashboardAsync(ct));
    [HttpGet("users")] public async Task<IActionResult> Users(CancellationToken ct) => Ok(await admin.GetUsersAsync(ct));
}
