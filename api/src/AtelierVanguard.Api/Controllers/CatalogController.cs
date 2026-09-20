using AtelierVanguard.Application.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AtelierVanguard.Api.Controllers;

[ApiController, Route("api/v1"), Tags("Catalog")]
public sealed class CatalogController(ICatalogService catalog) : ControllerBase
{
    [AllowAnonymous, HttpGet("products")]
    public async Task<IActionResult> Products([FromQuery] string? category, CancellationToken ct) => Ok(await catalog.GetProductsAsync(category, ct));

    [AllowAnonymous, HttpGet("products/{slug}")]
    public async Task<IActionResult> Product(string slug, CancellationToken ct)
    {
        var product = await catalog.GetBySlugAsync(slug, ct);
        return product is null ? NotFound() : Ok(product);
    }

    [AllowAnonymous, HttpGet("fabrics")]
    public async Task<IActionResult> Fabrics(CancellationToken ct) => Ok(await catalog.GetFabricsAsync(ct));
}


[ApiController, Route("api/v1/admin"), Authorize(Policy = "Admin"), Tags("Admin Catalog")]
public sealed class AdminCatalogController(IAdminCatalogService catalog) : ControllerBase
{
    [HttpGet("products")]
    public async Task<IActionResult> Products([FromQuery] string? search, [FromQuery] string? category,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default) =>
        Ok(await catalog.GetProductsAsync(new(search, category, page, pageSize), ct));

    [HttpGet("products/{id:guid}")]
    public async Task<IActionResult> Product(Guid id, CancellationToken ct)
    { var value = await catalog.GetProductAsync(id, ct); return value is null ? NotFound() : Ok(value); }

    [HttpPost("products")]
    public async Task<IActionResult> CreateProduct(SaveProductRequest request, CancellationToken ct)
    { var value = await catalog.CreateProductAsync(request, ct); return CreatedAtAction(nameof(Product), new { id = value.Id }, value); }

    [HttpPut("products/{id:guid}")]
    public async Task<IActionResult> UpdateProduct(Guid id, SaveProductRequest request, CancellationToken ct)
    { var value = await catalog.UpdateProductAsync(id, request, ct); return value is null ? NotFound() : Ok(value); }

    [HttpDelete("products/{id:guid}")]
    public async Task<IActionResult> DeleteProduct(Guid id, CancellationToken ct) =>
        await catalog.DeleteProductAsync(id, ct) ? NoContent() : NotFound();

    [HttpGet("fabrics/{id:guid}")]
    public async Task<IActionResult> Fabric(Guid id, CancellationToken ct)
    { var value = await catalog.GetFabricAsync(id, ct); return value is null ? NotFound() : Ok(value); }

    [HttpPost("fabrics")]
    public async Task<IActionResult> CreateFabric(SaveFabricRequest request, CancellationToken ct)
    { var value = await catalog.CreateFabricAsync(request, ct); return CreatedAtAction(nameof(Fabric), new { id = value.Id }, value); }

    [HttpPut("fabrics/{id:guid}")]
    public async Task<IActionResult> UpdateFabric(Guid id, SaveFabricRequest request, CancellationToken ct)
    { var value = await catalog.UpdateFabricAsync(id, request, ct); return value is null ? NotFound() : Ok(value); }

    [HttpDelete("fabrics/{id:guid}")]
    public async Task<IActionResult> DeleteFabric(Guid id, CancellationToken ct) =>
        await catalog.DeleteFabricAsync(id, ct) ? NoContent() : NotFound();
}
