public class MySimpleMiddleware
{
    private readonly RequestDelegate _next;

    public MySimpleMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        System.Console.WriteLine(context.Request.Path.Value);

        // Always allow OPTIONS requests to pass
        if (context.Request.Method == HttpMethods.Options)
        {
            context.Response.StatusCode = StatusCodes.Status204NoContent; // or just call next
            await _next(context);
            return;
        }

        int? UserId = context.Session.GetInt32("UserId");

        // Only block if not logged in AND path is not /Auth
        if(UserId == null && !context.Request.Path.Value!.Contains("/Auth/"))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return; 
        }

        await _next(context);
    }
}