using AtelierVanguard.Domain.Common;

namespace AtelierVanguard.Domain.Measurements;

public enum MeasurementStatus { Draft, PendingReview, Approved, CorrectionRequired }

public sealed class MeasurementProfile : Entity
{
    public Guid CustomerId { get; set; }
    public required string Name { get; set; }
    public string Unit { get; set; } = "cm";
    public string FitPreference { get; set; } = "Tailored";
    public MeasurementStatus Status { get; set; } = MeasurementStatus.Draft;
    public decimal Chest { get; set; }
    public decimal Waist { get; set; }
    public decimal Hip { get; set; }
    public decimal Shoulder { get; set; }
    public decimal Sleeve { get; set; }
    public decimal Inseam { get; set; }
}
