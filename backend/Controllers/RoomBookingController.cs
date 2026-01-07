using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RoomBookingController : ControllerBase
{
    private readonly IRoomBookingRepository _bookingRepository;

    public RoomBookingController(IRoomBookingRepository bookingRepository)
    {
        _bookingRepository = bookingRepository;
    }

    [HttpPost("book")]
    public async Task<IActionResult> BookRoom(CreateRoomBookingDTO dto)
    {
        int? userId = HttpContext.Session.GetInt32("UserId");

        bool isAvailable = await _bookingRepository.IsRoomAvailableAsync(
            dto.RoomId, dto.BookingDate, dto.StartDateTime, dto.EndDateTime
        );

        if (!isAvailable)
            return BadRequest("The room is already booked for the selected time.");

        var booking = await _bookingRepository.CreateBookingAsync(new RoomBooking
        {
            RoomId = dto.RoomId,
            UserId = (int)userId!,
            StartDateTime = dto.StartDateTime,
            EndDateTime = dto.EndDateTime,
            Purpose = dto.Purpose
        });


        return Ok(new 
        {
            booking.RoomId,
            booking.StartDateTime,
            booking.EndDateTime,
            booking.Purpose
        });
    }
}
