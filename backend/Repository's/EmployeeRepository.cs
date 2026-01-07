
using Microsoft.EntityFrameworkCore;

public class EmployeeRepository : IRepo<Employee>
{
    private readonly AppDbContext _context;

    public EmployeeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Employee> AddAsync(Employee emp)
    {
        _context.Employees.Add(emp);
        await _context.SaveChangesAsync();
        return emp;
    }

    public async Task DeleteAsync(int id)
    {
        var product = await GetByIdAsync(id);
        if (product != null)
        {
            _context.Employees.Remove(product);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Employee>> GetAllAsync()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee?> GetByIdAsync(int id)
    {
        return await _context.Employees.FindAsync(id);
    }

    public Task UpdateAsync(Employee emp)
    {
        throw new NotImplementedException();
    }
}