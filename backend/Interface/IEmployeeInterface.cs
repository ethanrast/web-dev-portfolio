public interface IEmployeeInterface
{
    // CRUD operations only - no auth methods
    Task<IEnumerable<Employee>> GetAllAsync();
    Task<Employee?> GetByIdAsync(int id);
    Task<Employee> CreateAsync(Employee emp);
    Task<Employee?> UpdateAsync(int id, Employee emp);
    Task<bool> DeleteAsync(int id);
}
