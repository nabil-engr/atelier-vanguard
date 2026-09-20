using AtelierVanguard.Application.Catalog;
using AtelierVanguard.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AtelierVanguard.Infrastructure.Services;

public sealed class CatalogService(AppDbContext db) : ICatalogService
{
    public async Task<IReadOnlyList<ProductDto>> GetProductsAsync(string? category, CancellationToken ct)
    {
        var query = db.Products.AsNoTracking().Where(x => x.IsPublished);
        if (!string.IsNullOrWhiteSpace(category)) query = query.Where(x => x.Category == category);
        return await query.OrderByDescending(x => x.IsFeatured).ThenBy(x => x.Name)
            .Select(x => new ProductDto(x.Id, x.Name, x.Slug, x.Category, x.Summary, x.Description,
                x.Fabric, x.Origin, x.BasePrice, x.Currency, x.ImageUrl, x.IsFeatured, x.IsPublished)).ToListAsync(ct);
    }

    public Task<ProductDto?> GetBySlugAsync(string slug, CancellationToken ct) => db.Products.AsNoTracking()
        .Where(x => x.Slug == slug && x.IsPublished)
        .Select(x => new ProductDto(x.Id, x.Name, x.Slug, x.Category, x.Summary, x.Description,
            x.Fabric, x.Origin, x.BasePrice, x.Currency, x.ImageUrl, x.IsFeatured, x.IsPublished)).SingleOrDefaultAsync(ct);

    public async Task<IReadOnlyList<FabricDto>> GetFabricsAsync(CancellationToken ct) =>
        await db.Fabrics.AsNoTracking().OrderBy(x => x.Name)
            .Select(x => new FabricDto(x.Id, x.Name, x.Origin, x.Composition, x.ColorHex,
                x.PriceModifier, x.StockMeters)).ToListAsync(ct);
}
