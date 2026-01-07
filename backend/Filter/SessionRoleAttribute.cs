using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class SessionRoleAttribute : Attribute, IAuthorizationFilter
{
    private readonly string _role;
    public SessionRoleAttribute(string role)
    {
        _role = role;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var role = context.HttpContext.Session.GetString("UserRole");
        if (role == null || role != _role)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}
