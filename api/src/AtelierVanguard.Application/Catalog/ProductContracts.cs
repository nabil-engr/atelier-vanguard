using System.ComponentModel.DataAnnotations;

namespace AtelierVanguard.Application.Catalog;

public sealed record ProductDto(Guid Id, string Name, string Slug, string Category, string Summary,
    string Description, string Fabric, string Origin, decimal BasePrice, string Currency,
    string ImageUrl, bool IsFeatured, bool IsPublished);

public sealed record FabricDto(Guid Id, string Name, string Origin, string Composition,
    string ColorHex, decimal PriceModifier, decimal StockMeters);

public interface ICatalogService
{
    Task<IReadOnlyList<ProductDto>> GetProductsAsync(string? category, CancellationToken cancellationToken);
    Task<ProductDto?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<IReadOnlyList<FabricDto>> GetFabricsAsync(CancellationToken cancellationToken);
}

public sealed record ProductListQuery(string? Search, string? Category, int Page = 1, int PageSize = 20);
public sealed record SaveProductRequest([Required, StringLength(150)] string Name,
    [Required, RegularExpression("^[a-z0-9]+(?:-[a-z0-9]+)*$")] string Slug,
    [Required, StringLength(80)] string Category, [StringLength(400)] string Summary,
    [StringLength(5000)] string Description, [StringLength(150)] string Fabric,
    [StringLength(100)] string Origin, [Range(0, 10000000)] decimal BasePrice,
    [Required, StringLength(3, MinimumLength = 3)] string Currency,
    [Url, StringLength(2000)] string ImageUrl, bool IsFeatured, bool IsPublished);
public sealed record SaveFabricRequest([Required, StringLength(150)] string Name,
    [StringLength(100)] string Origin, [StringLength(200)] string Composition,
    [RegularExpression("^#[0-9a-fA-F]{6}$")] string ColorHex,
    [Range(0, 1000000)] decimal PriceModifier, [Range(0, 1000000)] decimal StockMeters);
public sealed record PagedResult<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount);

public interface IAdminCatalogService
{
    Task<PagedResult<ProductDto>> GetProductsAsync(ProductListQuery query, CancellationToken cancellationToken);
    Task<ProductDto?> GetProductAsync(Guid id, CancellationToken cancellationToken);
    Task<ProductDto> CreateProductAsync(SaveProductRequest request, CancellationToken cancellationToken);
    Task<ProductDto?> UpdateProductAsync(Guid id, SaveProductRequest request, CancellationToken cancellationToken);
    Task<bool> DeleteProductAsync(Guid id, CancellationToken cancellationToken);
    Task<FabricDto?> GetFabricAsync(Guid id, CancellationToken cancellationToken);
    Task<FabricDto> CreateFabricAsync(SaveFabricRequest request, CancellationToken cancellationToken);
    Task<FabricDto?> UpdateFabricAsync(Guid id, SaveFabricRequest request, CancellationToken cancellationToken);
    Task<bool> DeleteFabricAsync(Guid id, CancellationToken cancellationToken);
}
