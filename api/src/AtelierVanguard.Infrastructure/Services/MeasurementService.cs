using AtelierVanguard.Application.Measurements;
using AtelierVanguard.Domain.Measurements;
using AtelierVanguard.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AtelierVanguard.Infrastructure.Services;

public sealed class MeasurementService(AppDbContext db) : IMeasurementService
{
    public async Task<IReadOnlyList<MeasurementDto>> GetAsync(Guid customerId, CancellationToken ct) =>
        (await db.MeasurementProfiles.AsNoTracking().Where(x => x.CustomerId == customerId)
            .OrderByDescending(x => x.CreatedAtUtc).ToListAsync(ct)).Select(Map).ToList();

    public async Task<MeasurementDto?> GetByIdAsync(Guid customerId, Guid id, CancellationToken ct)
    {
        var item = await db.MeasurementProfiles.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id && x.CustomerId == customerId, ct);
        return item is null ? null : Map(item);
    }

    public async Task<MeasurementDto> SaveAsync(Guid customerId, SaveMeasurementRequest r, CancellationToken ct)
    {
        var profile = new MeasurementProfile { CustomerId = customerId, Name = r.Name, Unit = r.Unit,
            FitPreference = r.FitPreference, Chest = r.Chest, Waist = r.Waist, Hip = r.Hip,
            Shoulder = r.Shoulder, Sleeve = r.Sleeve, Inseam = r.Inseam, Status = MeasurementStatus.PendingReview };
        db.MeasurementProfiles.Add(profile);
        await db.SaveChangesAsync(ct);
        return Map(profile);
    }

    public async Task<MeasurementDto?> UpdateAsync(Guid customerId, Guid id, SaveMeasurementRequest r, CancellationToken ct)
    {
        var x = await db.MeasurementProfiles.SingleOrDefaultAsync(x => x.Id == id && x.CustomerId == customerId, ct);
        if (x is null) return null;
        Apply(x, r); x.Status = MeasurementStatus.PendingReview;
        await db.SaveChangesAsync(ct);
        return Map(x);
    }

    public async Task<bool> DeleteAsync(Guid customerId, Guid id, CancellationToken ct)
    {
        var x = await db.MeasurementProfiles.SingleOrDefaultAsync(x => x.Id == id && x.CustomerId == customerId, ct);
        if (x is null) return false;
        db.MeasurementProfiles.Remove(x); await db.SaveChangesAsync(ct); return true;
    }

    public async Task<IReadOnlyList<MeasurementDto>> GetPendingAsync(CancellationToken ct) =>
        (await db.MeasurementProfiles.AsNoTracking().Where(x => x.Status == MeasurementStatus.PendingReview)
            .OrderBy(x => x.CreatedAtUtc).ToListAsync(ct)).Select(Map).ToList();

    public async Task<MeasurementDto?> ReviewAsync(Guid id, bool approved, CancellationToken ct)
    {
        var x = await db.MeasurementProfiles.FindAsync([id], ct);
        if (x is null) return null;
        x.Status = approved ? MeasurementStatus.Approved : MeasurementStatus.CorrectionRequired;
        await db.SaveChangesAsync(ct); return Map(x);
    }

    private static void Apply(MeasurementProfile x, SaveMeasurementRequest r)
    { x.Name = r.Name.Trim(); x.Unit = r.Unit.Trim(); x.FitPreference = r.FitPreference.Trim(); x.Chest = r.Chest; x.Waist = r.Waist; x.Hip = r.Hip; x.Shoulder = r.Shoulder; x.Sleeve = r.Sleeve; x.Inseam = r.Inseam; }

    private static MeasurementDto Map(MeasurementProfile x) => new(x.Id, x.Name, x.Unit, x.FitPreference,
        x.Status.ToString(), x.Chest, x.Waist, x.Hip, x.Shoulder, x.Sleeve, x.Inseam);
}
