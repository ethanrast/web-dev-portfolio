public class CreateRoomBookingDTO
{
    public int RoomId { get; set; }
    public DateTime BookingDate { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public string Purpose { get; set; } = string.Empty;
}
