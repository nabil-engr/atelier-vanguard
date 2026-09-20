using System.ComponentModel.DataAnnotations;

namespace AtelierVanguard.Application.Measurements;

public sealed record SaveMeasurementRequest([Required, StringLength(100)] string Name,
    [Required, RegularExpression("^(cm|in)$")] string Unit,
    [Required, StringLength(50)] string FitPreference,
    [Range(1, 300)] decimal Chest, [Range(1, 300)] decimal Waist,
    [Range(1, 300)] decimal Hip, [Range(1, 300)] decimal Shoulder,
    [Range(1, 300)] decimal Sleeve, [Range(1, 300)] decimal Inseam);
public sealed record MeasurementDto(Guid Id, string Name, string Unit, string FitPreference, string Status,
    decimal Chest, decimal Waist, decimal Hip, decimal Shoulder, decimal Sleeve, decimal Inseam);

public interface IMeasurementService
{
    Task<IReadOnlyList<MeasurementDto>> GetAsync(Guid customerId, CancellationToken cancellationToken);
    Task<MeasurementDto?> GetByIdAsync(Guid customerId, Guid id, CancellationToken cancellationToken);
    Task<MeasurementDto> SaveAsync(Guid customerId, SaveMeasurementRequest request, CancellationToken cancellationToken);
    Task<MeasurementDto?> UpdateAsync(Guid customerId, Guid id, SaveMeasurementRequest request, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid customerId, Guid id, CancellationToken cancellationToken);
    Task<IReadOnlyList<MeasurementDto>> GetPendingAsync(CancellationToken cancellationToken);
    Task<MeasurementDto?> ReviewAsync(Guid id, bool approved, CancellationToken cancellationToken);
}
