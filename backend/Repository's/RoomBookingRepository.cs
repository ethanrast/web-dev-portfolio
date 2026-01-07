using Microsoft.EntityFrameworkCore;

public class RoomBookingRepository : IRoomBookingRepository
{
    private readonly AppDbContext _context;

    public RoomBookingRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<RoomBooking> CreateBookingAsync(RoomBooking booking)
    {
        _context.RoomBookings.Add(booking);
        await _context.SaveChangesAsync();
        return booking;
    }

    public async Task<bool> IsRoomAvailableAsync(int roomId, DateTime date, DateTime start, DateTime end)
    {
       
        return !await _context.RoomBookings.AnyAsync(rb =>
        rb.RoomId == roomId &&
        rb.StartDateTime < end &&
        rb.EndDateTime > start);
    
    }
}
