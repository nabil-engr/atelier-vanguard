using AtelierVanguard.Api.Security;
using AtelierVanguard.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;

namespace AtelierVanguard.Api.Controllers;

[ApiController, Route("api/v1/auth"), Tags("Authentication")]
public sealed class AuthController(UserManager<ApplicationUser> users, JwtTokenService tokens) : ControllerBase
{
    public sealed record RegisterRequest([Required, StringLength(100)] string FullName,
        [Required, EmailAddress] string Email, [Required, MinLength(8)] string Password,
        [Required, StringLength(80)] string Country);
    public sealed record LoginRequest([Required, EmailAddress] string Email, [Required] string Password);

    [AllowAnonymous, HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var user = new ApplicationUser { UserName = request.Email, Email = request.Email,
            FullName = request.FullName, Country = request.Country };
        var result = await users.CreateAsync(user, request.Password);
        if (!result.Succeeded) return ValidationProblem(new ValidationProblemDetails(
            result.Errors.GroupBy(x => x.Code).ToDictionary(x => x.Key, x => x.Select(e => e.Description).ToArray())));
        await users.AddToRoleAsync(user, "Customer");
        return Ok(new { accessToken = tokens.Create(user, ["Customer"]), user = new { user.Id, user.FullName, user.Email } });
    }

    [AllowAnonymous, HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await users.FindByEmailAsync(request.Email);
        if (user is null || !await users.CheckPasswordAsync(user, request.Password)) return Unauthorized();
        var roles = await users.GetRolesAsync(user);
        return Ok(new { accessToken = tokens.Create(user, roles), user = new { user.Id, user.FullName, user.Email, roles } });
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var idValue = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        if (!Guid.TryParse(idValue, out var id)) return Unauthorized();
        var user = await users.FindByIdAsync(id.ToString());
        if (user is null) return NotFound();
        return Ok(new { user.Id, user.FullName, user.Email, user.Country, roles = await users.GetRolesAsync(user) });
    }
}
