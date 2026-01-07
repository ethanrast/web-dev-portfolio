public class OfficeAttendanceDTO
{
    public DateTime Date { get; set; }
    public string Status { get; set; } = null!;
    public string? CheckIn { get; set; }
    public string? CheckOut { get; set; }
}