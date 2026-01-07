
public interface IEmployeeRepository
{
   Task<bool> LogInAsync(string username, string password);
   Task<bool> RegistrationAsync(Employee employee);
   Task<bool> IsRegistered();
   Task LogOut();
}