using Microsoft.AspNetCore.Identity;

namespace AtelierVanguard.Infrastructure.Identity;

public sealed class ApplicationUser : IdentityUser<Guid>
{
    public string FullName { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}
