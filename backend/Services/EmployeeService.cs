using System.Linq;
using Microsoft.EntityFrameworkCore;

public class EmployeeService : IEmployeeInterface
{
    private readonly IRepo<Employee> _context;
    
    public EmployeeService(IRepo<Employee> context)
    {
        _context = context;
    }

    public Task<Employee> CreateAsync(Employee emp)
    {
        return _context.AddAsync(emp);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _context.GetByIdAsync(id);  
        if (existing == null) return false;

        await _context.DeleteAsync(id);
        return true;
    }

    public Task<IEnumerable<Employee>> GetAllAsync()
    {
        return _context.GetAllAsync();
    }

    public Task<Employee?> GetByIdAsync(int id)
    {
        return _context.GetByIdAsync(id);
    }

    public Task<Employee?> UpdateAsync(int id, Employee emp)
    {
        return null;
    }
}