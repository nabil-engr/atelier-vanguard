using AtelierVanguard.Domain.Catalog;
using AtelierVanguard.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AtelierVanguard.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        for (var attempt = 1; ; attempt++)
        {
            try
            {
                await db.Database.EnsureCreatedAsync();
                break;
            }
            catch when (attempt < 6)
            {
                await Task.Delay(TimeSpan.FromSeconds(attempt * 2));
            }
        }
        var roles = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        foreach (var role in new[] { "Customer", "Admin", "SuperAdmin", "Tailor", "OrderManager" })
            if (!await roles.RoleExistsAsync(role)) await roles.CreateAsync(new IdentityRole<Guid>(role));

        var environment = scope.ServiceProvider.GetRequiredService<IHostEnvironment>();
        if (environment.IsDevelopment())
        {
            var users = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            await EnsureUserAsync(users, "customer@ateliervanguard.local", "DemoCustomer!2026", "Demo Customer", "Customer");
            await EnsureUserAsync(users, "admin@ateliervanguard.local", "DemoAdmin!2026", "Demo Admin", "Admin");
        }

        if (await db.Products.AnyAsync()) return;
        db.Products.AddRange(
            new Product { Name = "Mayfair Royal Drape", Slug = "mayfair-royal-drape", Category = "Suits",
                Summary = "Full-canvas two-piece suit with a soft structured shoulder.",
                Description = "Hand-cut and finished with functional cuffs and a breathable full canvas.",
                Fabric = "Super 150s Merino Wool", Origin = "Biella, Italy", BasePrice = 1650, IsFeatured = true },
            new Product { Name = "Jamdani Silk Dress", Slug = "jamdani-silk-dress", Category = "Dresses",
                Summary = "A modern occasion dress woven with heritage Jamdani motifs.",
                Description = "Pure silk, individually woven and shaped to your measurements.",
                Fabric = "Handloom Jamdani Silk", Origin = "Dhaka, Bangladesh", BasePrice = 690, IsFeatured = true },
            new Product { Name = "Egyptian Cotton Shirt", Slug = "egyptian-cotton-shirt", Category = "Shirts",
                Summary = "Clean, breathable and made for your exact posture.",
                Description = "Finished with mother-of-pearl buttons and hand-set sleeves.",
                Fabric = "Giza 87 Cotton", Origin = "Alexandria, Egypt", BasePrice = 285 });
        db.Fabrics.AddRange(
            new Fabric { Name = "Navy Super 150s", Origin = "Biella, Italy", Composition = "100% Merino Wool", ColorHex = "#16243a", StockMeters = 48 },
            new Fabric { Name = "Heritage Jamdani", Origin = "Dhaka, Bangladesh", Composition = "Silk", ColorHex = "#d5c195", PriceModifier = 240, StockMeters = 12 });
        await db.SaveChangesAsync();
    }

    private static async Task EnsureUserAsync(UserManager<ApplicationUser> users, string email,
        string password, string fullName, string role)
    {
        var user = await users.FindByEmailAsync(email);
        if (user is null)
        {
            user = new ApplicationUser { UserName = email, Email = email, EmailConfirmed = true,
                FullName = fullName, Country = "Bangladesh" };
            var result = await users.CreateAsync(user, password);
            if (!result.Succeeded)
                throw new InvalidOperationException(string.Join("; ", result.Errors.Select(x => x.Description)));
        }
        if (!await users.IsInRoleAsync(user, role)) await users.AddToRoleAsync(user, role);
    }
}
