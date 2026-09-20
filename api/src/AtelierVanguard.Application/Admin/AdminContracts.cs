namespace AtelierVanguard.Application.Admin;

public sealed record DashboardDto(decimal Revenue, int TotalOrders, int ActiveOrders, int PendingMeasurements,
    int Customers, int LowStockFabrics);
public sealed record UserDto(Guid Id, string FullName, string Email, string Country, IReadOnlyList<string> Roles);

public interface IAdminService
{
    Task<DashboardDto> GetDashboardAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<UserDto>> GetUsersAsync(CancellationToken cancellationToken);
}
