public class Admin
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Permissions { get; set; } = null!;

    // Navigation property
    public Employee User { get; set; } = null!;
}
