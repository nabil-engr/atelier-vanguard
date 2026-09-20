using AtelierVanguard.Application.Catalog;
using AtelierVanguard.Domain.Catalog;
using AtelierVanguard.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AtelierVanguard.Infrastructure.Services;

public sealed class AdminCatalogService(AppDbContext db) : IAdminCatalogService
{
    public async Task<PagedResult<ProductDto>> GetProductsAsync(ProductListQuery request, CancellationToken ct)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);
        var query = db.Products.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(x => x.Name.Contains(request.Search) || x.Slug.Contains(request.Search));
        if (!string.IsNullOrWhiteSpace(request.Category)) query = query.Where(x => x.Category == request.Category);
        var total = await query.CountAsync(ct);
        var items = await query.OrderBy(x => x.Name).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => MapProduct(x)).ToListAsync(ct);
        return new(items, page, pageSize, total);
    }

    public Task<ProductDto?> GetProductAsync(Guid id, CancellationToken ct) => db.Products.AsNoTracking()
        .Where(x => x.Id == id).Select(x => MapProduct(x)).SingleOrDefaultAsync(ct);

    public async Task<ProductDto> CreateProductAsync(SaveProductRequest r, CancellationToken ct)
    {
        await EnsureUniqueSlug(r.Slug, null, ct);
        var entity = new Product { Name = r.Name.Trim(), Slug = r.Slug.Trim().ToLowerInvariant(), Category = r.Category.Trim() };
        Apply(entity, r);
        db.Products.Add(entity);
        await db.SaveChangesAsync(ct);
        return MapProduct(entity);
    }

    public async Task<ProductDto?> UpdateProductAsync(Guid id, SaveProductRequest r, CancellationToken ct)
    {
        var entity = await db.Products.FindAsync([id], ct);
        if (entity is null) return null;
        await EnsureUniqueSlug(r.Slug, id, ct);
        Apply(entity, r);
        await db.SaveChangesAsync(ct);
        return MapProduct(entity);
    }

    public async Task<bool> DeleteProductAsync(Guid id, CancellationToken ct)
    {
        var entity = await db.Products.FindAsync([id], ct);
        if (entity is null) return false;
        db.Products.Remove(entity);
        await db.SaveChangesAsync(ct);
        return true;
    }

    public Task<FabricDto?> GetFabricAsync(Guid id, CancellationToken ct) => db.Fabrics.AsNoTracking()
        .Where(x => x.Id == id).Select(x => MapFabric(x)).SingleOrDefaultAsync(ct);

    public async Task<FabricDto> CreateFabricAsync(SaveFabricRequest r, CancellationToken ct)
    {
        var entity = new Fabric { Name = r.Name.Trim() };
        Apply(entity, r);
        db.Fabrics.Add(entity);
        await db.SaveChangesAsync(ct);
        return MapFabric(entity);
    }

    public async Task<FabricDto?> UpdateFabricAsync(Guid id, SaveFabricRequest r, CancellationToken ct)
    {
        var entity = await db.Fabrics.FindAsync([id], ct);
        if (entity is null) return null;
        Apply(entity, r);
        await db.SaveChangesAsync(ct);
        return MapFabric(entity);
    }

    public async Task<bool> DeleteFabricAsync(Guid id, CancellationToken ct)
    {
        var entity = await db.Fabrics.FindAsync([id], ct);
        if (entity is null) return false;
        db.Fabrics.Remove(entity);
        await db.SaveChangesAsync(ct);
        return true;
    }

    private async Task EnsureUniqueSlug(string slug, Guid? exceptId, CancellationToken ct)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        if (await db.Products.AnyAsync(x => x.Slug == normalized && x.Id != exceptId, ct))
            throw new InvalidOperationException("A product with this slug already exists.");
    }

    private static void Apply(Product x, SaveProductRequest r)
    {
        x.Name = r.Name.Trim(); x.Slug = r.Slug.Trim().ToLowerInvariant(); x.Category = r.Category.Trim();
        x.Summary = r.Summary.Trim(); x.Description = r.Description.Trim(); x.Fabric = r.Fabric.Trim();
        x.Origin = r.Origin.Trim(); x.BasePrice = r.BasePrice; x.Currency = r.Currency.Trim().ToUpperInvariant();
        x.ImageUrl = r.ImageUrl.Trim(); x.IsFeatured = r.IsFeatured; x.IsPublished = r.IsPublished;
    }

    private static void Apply(Fabric x, SaveFabricRequest r)
    { x.Name = r.Name.Trim(); x.Origin = r.Origin.Trim(); x.Composition = r.Composition.Trim(); x.ColorHex = r.ColorHex.Trim(); x.PriceModifier = r.PriceModifier; x.StockMeters = r.StockMeters; }

    private static ProductDto MapProduct(Product x) => new(x.Id, x.Name, x.Slug, x.Category, x.Summary,
        x.Description, x.Fabric, x.Origin, x.BasePrice, x.Currency, x.ImageUrl, x.IsFeatured, x.IsPublished);
    private static FabricDto MapFabric(Fabric x) => new(x.Id, x.Name, x.Origin, x.Composition, x.ColorHex, x.PriceModifier, x.StockMeters);
}
