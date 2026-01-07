
using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthInterface
{
    private readonly AppDbContext _context; 

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Employee?> CurrentLogIn(int id)
    {
        return await _context.Employees.FirstOrDefaultAsync(emp => emp.Id == id);
    }

    public async Task<Employee?> Login(string email, string password)
    {
        Console.WriteLine($"AuthService Login called with email: {email}, password: {password}");
        return await _context.Employees.FirstOrDefaultAsync(e => e.Email == email && e.Password == password);

    }

    public async Task<Employee?> RegisterUser(Employee employee)
    {
        if(employee.Role == "Employee" || employee.Role == "Admin")
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        return null;
    }
}