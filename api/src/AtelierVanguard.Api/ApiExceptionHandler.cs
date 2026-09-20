using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace AtelierVanguard.Api;

public sealed class ApiExceptionHandler(ILogger<ApiExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken ct)
    {
        var (status, title) = exception switch
        {
            ArgumentException => (StatusCodes.Status400BadRequest, "Invalid request"),
            InvalidOperationException => (StatusCodes.Status409Conflict, "Request conflict"),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred")
        };
        if (status == 500) logger.LogError(exception, "Unhandled API exception");
        else logger.LogWarning(exception, "Rejected API request");
        context.Response.StatusCode = status;
        await context.Response.WriteAsJsonAsync(new ProblemDetails
        { Status = status, Title = title, Detail = status == 500 ? "Please try again later." : exception.Message }, ct);
        return true;
    }
}
