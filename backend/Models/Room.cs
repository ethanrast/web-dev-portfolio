public class Room
{
    public int Id { get; set; }
    public string RoomName { get; set; } = null!;
    public int Capacity { get; set; }
    public string Location { get; set; } = null!;

    // Navigation property
    public ICollection<RoomBooking>? Bookings { get; set; }
}
