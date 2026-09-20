namespace AtelierVanguard.Api;

public static class OpenApiDocumentFactory
{
    public static object Create() => new
    {
        openapi = "3.0.1",
        info = new { title = "Atelier Vanguard API", version = "v1", description = "Secure made-to-measure commerce and operations API" },
        servers = new[] { new { url = "/" } },
        tags = new[] { "Authentication", "Catalog", "Measurements", "Orders", "Admin", "Admin Catalog", "Admin Measurements", "Admin Orders" }.Select(x => new { name = x }).ToArray(),
        paths = new Dictionary<string, object>
        {
            ["/api/v1/auth/register"] = Path(Op("post", "Register customer", "Authentication", false, "RegisterRequest")),
            ["/api/v1/auth/login"] = Path(Op("post", "Sign in", "Authentication", false, "LoginRequest")),
            ["/api/v1/auth/me"] = Path(Op("get", "Current user profile", "Authentication")),
            ["/api/v1/products"] = Path(Op("get", "List published products", "Catalog", false)),
            ["/api/v1/products/{slug}"] = Path(Op("get", "Get published product", "Catalog", false, parameter: "slug")),
            ["/api/v1/fabrics"] = Path(Op("get", "List fabrics", "Catalog", false)),
            ["/api/v1/measurements"] = Path(Op("get", "List my measurement profiles", "Measurements"), Op("post", "Create measurement profile", "Measurements", body: "SaveMeasurementRequest")),
            ["/api/v1/measurements/{id}"] = Path(Op("get", "Get my measurement profile", "Measurements", parameter: "id"), Op("put", "Update my measurement profile", "Measurements", body: "SaveMeasurementRequest", parameter: "id"), Op("delete", "Delete my measurement profile", "Measurements", parameter: "id")),
            ["/api/v1/orders"] = Path(Op("get", "List my orders", "Orders"), Op("post", "Create order", "Orders", body: "CreateOrderRequest")),
            ["/api/v1/orders/{id}"] = Path(Op("get", "Get my order", "Orders", parameter: "id")),
            ["/api/v1/orders/{id}/cancel"] = Path(Op("post", "Cancel my order", "Orders", parameter: "id")),
            ["/api/v1/admin/dashboard"] = Path(Op("get", "Dashboard metrics", "Admin")),
            ["/api/v1/admin/users"] = Path(Op("get", "List users", "Admin")),
            ["/api/v1/admin/products"] = Path(Op("get", "Search and paginate products", "Admin Catalog"), Op("post", "Create product", "Admin Catalog", body: "SaveProductRequest")),
            ["/api/v1/admin/products/{id}"] = Path(Op("get", "Get product", "Admin Catalog", parameter: "id"), Op("put", "Update product", "Admin Catalog", body: "SaveProductRequest", parameter: "id"), Op("delete", "Delete product", "Admin Catalog", parameter: "id")),
            ["/api/v1/admin/fabrics"] = Path(Op("post", "Create fabric", "Admin Catalog", body: "SaveFabricRequest")),
            ["/api/v1/admin/fabrics/{id}"] = Path(Op("get", "Get fabric", "Admin Catalog", parameter: "id"), Op("put", "Update fabric", "Admin Catalog", body: "SaveFabricRequest", parameter: "id"), Op("delete", "Delete fabric", "Admin Catalog", parameter: "id")),
            ["/api/v1/admin/measurements/pending"] = Path(Op("get", "List pending measurement reviews", "Admin Measurements")),
            ["/api/v1/admin/measurements/{id}/review"] = Path(Op("patch", "Approve or request correction", "Admin Measurements", body: "ReviewMeasurementRequest", parameter: "id")),
            ["/api/v1/admin/orders"] = Path(Op("get", "List all orders", "Admin Orders")),
            ["/api/v1/admin/orders/{id}"] = Path(Op("get", "Get order", "Admin Orders", parameter: "id")),
            ["/api/v1/admin/orders/{id}/status"] = Path(Op("patch", "Update order status", "Admin Orders", body: "UpdateOrderStatusRequest", parameter: "id")),
            ["/health"] = Path(Op("get", "Health check", "System", false))
        },
        components = new
        {
            securitySchemes = new Dictionary<string, object> { ["Bearer"] = new { type = "http", scheme = "bearer", bearerFormat = "JWT" } },
            schemas = new Dictionary<string, object>
            {
                ["LoginRequest"] = Schema(("email", "string"), ("password", "string")),
                ["RegisterRequest"] = Schema(("fullName", "string"), ("email", "string"), ("password", "string"), ("country", "string")),
                ["SaveMeasurementRequest"] = Schema(("name", "string"), ("unit", "string"), ("fitPreference", "string"), ("chest", "number"), ("waist", "number"), ("hip", "number"), ("shoulder", "number"), ("sleeve", "number"), ("inseam", "number")),
                ["SaveProductRequest"] = Schema(("name", "string"), ("slug", "string"), ("category", "string"), ("summary", "string"), ("description", "string"), ("fabric", "string"), ("origin", "string"), ("basePrice", "number"), ("currency", "string"), ("imageUrl", "string"), ("isFeatured", "boolean"), ("isPublished", "boolean")),
                ["SaveFabricRequest"] = Schema(("name", "string"), ("origin", "string"), ("composition", "string"), ("colorHex", "string"), ("priceModifier", "number"), ("stockMeters", "number")),
                ["ReviewMeasurementRequest"] = Schema(("approved", "boolean")),
                ["UpdateOrderStatusRequest"] = Schema(("status", "string"), ("note", "string")),
                ["CreateOrderRequest"] = Schema(("currency", "string"), ("items", "array"))
            }
        }
    };

    private static Dictionary<string, object> Path(params KeyValuePair<string, object>[] operations) => operations.ToDictionary(x => x.Key, x => x.Value);

    private static KeyValuePair<string, object> Op(string method, string summary, string tag, bool secured = true, string? body = null, string? parameter = null)
    {
        var operation = new Dictionary<string, object>
        {
            ["tags"] = new[] { tag }, ["summary"] = summary,
            ["responses"] = new Dictionary<string, object> { ["200"] = new { description = "Success" }, ["400"] = new { description = "Invalid request" }, ["401"] = new { description = "Unauthorized" }, ["404"] = new { description = "Not found" } }
        };
        if (secured) operation["security"] = new[] { new Dictionary<string, string[]> { ["Bearer"] = [] } };
        if (body is not null) operation["requestBody"] = new { required = true, content = new Dictionary<string, object> { ["application/json"] = new { schema = new Dictionary<string, string> { ["$ref"] = $"#/components/schemas/{body}" } } } };
        if (parameter is not null) operation["parameters"] = new[] { new { name = parameter, @in = "path", required = true, schema = new { type = "string", format = parameter == "id" ? "uuid" : null } } };
        return new(method, operation);
    }

    private static object Schema(params (string Name, string Type)[] properties) => new
    {
        type = "object", properties = properties.ToDictionary(x => x.Name, x => (object)new { type = x.Type }), required = properties.Select(x => x.Name).ToArray()
    };
}
