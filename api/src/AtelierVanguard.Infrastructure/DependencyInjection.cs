using AtelierVanguard.Application.Catalog;
using AtelierVanguard.Application.Admin;
using AtelierVanguard.Application.Measurements;
using AtelierVanguard.Application.Orders;
using AtelierVanguard.Infrastructure.Identity;
using AtelierVanguard.Infrastructure.Persistence;
using AtelierVanguard.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AtelierVanguard.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(
            configuration.GetConnectionString("Postgres") ?? throw new InvalidOperationException("Missing Postgres connection string.")));
        services.AddIdentityCore<ApplicationUser>(options =>
        {
            options.Password.RequiredLength = 8;
            options.User.RequireUniqueEmail = true;
        }).AddRoles<IdentityRole<Guid>>().AddEntityFrameworkStores<AppDbContext>();
        services.AddScoped<ICatalogService, CatalogService>();
        services.AddScoped<IAdminCatalogService, AdminCatalogService>();
        services.AddScoped<IAdminService, AdminService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IMeasurementService, MeasurementService>();
        return services;
    }
}
