using AtelierVanguard.Domain.Common;

namespace AtelierVanguard.Domain.Catalog;

public sealed class Product : Entity
{
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public required string Category { get; set; }
    public string Summary { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Fabric { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public string Currency { get; set; } = "USD";
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; } = true;
}

public sealed class Fabric : Entity
{
    public required string Name { get; set; }
    public string Origin { get; set; } = string.Empty;
    public string Composition { get; set; } = string.Empty;
    public string ColorHex { get; set; } = "#172638";
    public decimal PriceModifier { get; set; }
    public decimal StockMeters { get; set; }
}
