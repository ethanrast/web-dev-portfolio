
public interface IAuthInterface

{
    Task<Employee?> RegisterUser(Employee employee);
    Task<Employee?> Login(string email, string password);

    Task<Employee?> CurrentLogIn(int id);
}