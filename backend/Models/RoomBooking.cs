using Microsoft.EntityFrameworkCore;

public class RoomBooking
{
    public int Id { get; set; }             
    public int RoomId { get; set; }
    public int UserId { get; set; }

    public DateTime StartDateTime { get; set; }  
    public DateTime EndDateTime { get; set; }    

    public string Purpose { get; set; } = string.Empty;

    // Navigation properties
    public Room Room { get; set; } = null!;
    public Employee User { get; set; } = null!;
}
