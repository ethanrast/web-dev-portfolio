public class OfficeAttendance
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; } = null!;

    public TimeSpan? CheckIn { get; set; }
    public TimeSpan? CheckOut { get; set; }

    public Employee User { get; set; } = null!;
}
