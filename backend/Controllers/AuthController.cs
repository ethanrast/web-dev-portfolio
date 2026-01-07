using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthInterface _AuthInterface;

    public AuthController(IAuthInterface _AuthInterface)
    {
        this._AuthInterface = _AuthInterface;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthDTO user)
    {
        Employee? employee = await _AuthInterface.Login(user.email, user.password);
        if(employee == null) return Unauthorized("no user found");
        HttpContext.Session.SetInt32("UserId", employee.Id);
        HttpContext.Session.SetString("UserRole", employee.Role);

        return Ok(employee);
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] Employee emp)
    {
        Employee? employee = await _AuthInterface.RegisterUser(emp);
        if(employee != null) return Ok(employee);
        return BadRequest();        
    }

    [HttpGet]
    public async Task<IActionResult> CurrentLogIn()
    {
        int? UserId = HttpContext.Session.GetInt32("UserId");    
        Employee? emp = await _AuthInterface.CurrentLogIn(UserId.Value);
        return Ok(new LoginStatusDTO 
        { 
            IsLoggedIn = true, 
            UserName = emp.Name,
            id = emp.Id,
            Role = emp.Role
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Remove("UserId");
        HttpContext.Session.Remove("UserRole");
        return Ok("logged out");
    }
}



