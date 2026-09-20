using AtelierVanguard.Application.Admin;
using AtelierVanguard.Domain.Measurements;
using AtelierVanguard.Domain.Orders;
using AtelierVanguard.Infrastructure.Identity;
using AtelierVanguard.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AtelierVanguard.Infrastructure.Services;

public sealed class AdminService(AppDbContext db, UserManager<ApplicationUser> users) : IAdminService
{
    public async Task<DashboardDto> GetDashboardAsync(CancellationToken ct)
    {
        var revenue = await db.Orders.Where(x => x.Status != OrderStatus.Cancelled).SumAsync(x => (decimal?)x.Total, ct) ?? 0;
        var totalOrders = await db.Orders.CountAsync(ct);
        var activeOrders = await db.Orders.CountAsync(x => x.Status != OrderStatus.Delivered && x.Status != OrderStatus.Completed && x.Status != OrderStatus.Cancelled, ct);
        var pending = await db.MeasurementProfiles.CountAsync(x => x.Status == MeasurementStatus.PendingReview, ct);
        var customers = await db.UserRoles.Join(db.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new { ur.UserId, r.Name })
            .Where(x => x.Name == "Customer").Select(x => x.UserId).Distinct().CountAsync(ct);
        var lowStock = await db.Fabrics.CountAsync(x => x.StockMeters < 10, ct);
        return new(revenue, totalOrders, activeOrders, pending, customers, lowStock);
    }

    public async Task<IReadOnlyList<UserDto>> GetUsersAsync(CancellationToken ct)
    {
        var result = new List<UserDto>();
        foreach (var user in await users.Users.AsNoTracking().OrderBy(x => x.FullName).ToListAsync(ct))
            result.Add(new(user.Id, user.FullName, user.Email ?? string.Empty, user.Country, (await users.GetRolesAsync(user)).ToList()));
        return result;
    }
}
