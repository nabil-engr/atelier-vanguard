using AtelierVanguard.Domain.Catalog;
using AtelierVanguard.Infrastructure.Identity;
using AtelierVanguard.Domain.Measurements;
using AtelierVanguard.Domain.Orders;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AtelierVanguard.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Fabric> Fabrics => Set<Fabric>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<OrderStatusHistory> OrderStatusHistory => Set<OrderStatusHistory>();
    public DbSet<MeasurementProfile> MeasurementProfiles => Set<MeasurementProfile>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Product>().HasIndex(x => x.Slug).IsUnique();
        builder.Entity<Product>().Property(x => x.BasePrice).HasPrecision(18, 2);
        builder.Entity<Fabric>().Property(x => x.PriceModifier).HasPrecision(18, 2);
        builder.Entity<Fabric>().Property(x => x.StockMeters).HasPrecision(18, 2);
        builder.Entity<Order>().Property(x => x.Total).HasPrecision(18, 2);
        builder.Entity<Order>().HasMany(x => x.Items).WithOne().HasForeignKey(x => x.OrderId);
        builder.Entity<Order>().HasMany(x => x.History).WithOne().HasForeignKey(x => x.OrderId);
    }
}
