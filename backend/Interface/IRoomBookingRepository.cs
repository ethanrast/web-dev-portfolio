public interface IRoomBookingRepository
{
    Task<bool> IsRoomAvailableAsync(int roomId, DateTime date, DateTime start, DateTime end);
    Task<RoomBooking> CreateBookingAsync(RoomBooking booking);
}
    