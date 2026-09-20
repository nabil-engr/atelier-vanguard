using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AtelierVanguard.Infrastructure.Identity;
using Microsoft.IdentityModel.Tokens;

namespace AtelierVanguard.Api.Security;

public sealed class JwtTokenService(IConfiguration configuration)
{
    public string Create(ApplicationUser user, IEnumerable<string> roles)
    {
        var claims = new List<Claim> { new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty), new(ClaimTypes.Name, user.FullName) };
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims,
            expires: DateTime.UtcNow.AddMinutes(30), signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
