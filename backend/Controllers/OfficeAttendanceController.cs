using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class OfficeAttendanceController : ControllerBase
{
    private readonly IOfficeAttendanceInterface _attendanceInterface;

    public OfficeAttendanceController(IOfficeAttendanceInterface attendanceInterface)
    {
        _attendanceInterface = attendanceInterface;
    }

    
    [HttpGet]
    public async Task<IActionResult> GetUserAttendance()
    {
        int? userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null) return Unauthorized("Not logged in");

        var attendances = await _attendanceInterface.GetUserAttendanceAsync(userId.Value);
        return Ok(attendances);
    }

    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        int? userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null) return Unauthorized("Not logged in");

        OfficeAttendance? attendance = await _attendanceInterface.GetByIdAsync(id);
        if (attendance == null) return NotFound($"Attendance with id {id} not found");

        if (attendance.UserId != userId.Value)
            return Forbid("You can only view your own attendance");

        return Ok(attendance);
    }

  
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] OfficeAttendanceDTO dto)
    {
        int? userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null) return Unauthorized("Not logged in");

        var existing = await _attendanceInterface.GetByDateAsync(userId.Value, dto.Date);
        if (existing != null)
            return BadRequest("Attendance already marked for this date");

        var attendance = new OfficeAttendance
        {
            UserId = userId.Value,
            Date = dto.Date,
            Status = dto.Status,
            CheckIn = ParseTimeOrNull(dto.CheckIn),
            CheckOut = ParseTimeOrNull(dto.CheckOut),
        };
        if (!string.Equals(dto.Status, "Office", StringComparison.OrdinalIgnoreCase))
        {
            attendance.CheckIn = null;
            attendance.CheckOut = null;
        }
        var created = await _attendanceInterface.CreateAsync(attendance);
        return Ok(created);
    }

   
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] OfficeAttendanceDTO dto)
    {
        int? userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null) return Unauthorized("Not logged in");

        OfficeAttendance? attendance = await _attendanceInterface.GetByIdAsync(id);
        if (attendance == null) return NotFound($"Attendance with id {id} not found");

        if (attendance.UserId != userId.Value)
            return Forbid("You can only edit your own attendance");

        if (attendance.Date != dto.Date)
        {
            var existingOnNewDate = await _attendanceInterface.GetByDateAsync(userId.Value, dto.Date);
            if (existingOnNewDate != null)
                return BadRequest("Attendance already marked for the new date");
        }

        attendance.Date = dto.Date;
        attendance.Status = dto.Status;
        attendance.CheckIn = ParseTimeOrNull(dto.CheckIn);
        attendance.CheckOut = ParseTimeOrNull(dto.CheckOut);

        if (!string.Equals(dto.Status, "Office", StringComparison.OrdinalIgnoreCase))
        {
            attendance.CheckIn = null;
            attendance.CheckOut = null;
        }

        var updated = await _attendanceInterface.UpdateAsync(id, attendance);
        if (updated == null) return BadRequest("Failed to update attendance");

        return Ok(updated);
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        int? userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null) return Unauthorized("Not logged in");

        OfficeAttendance? attendance = await _attendanceInterface.GetByIdAsync(id);
        if (attendance == null) return NotFound($"Attendance with id {id} not found");

        if (attendance.UserId != userId.Value)
            return Forbid("You can only delete your own attendance");

        bool deleted = await _attendanceInterface.DeleteAsync(id);
        if (!deleted) return BadRequest("Failed to delete attendance");

        return Ok($"Attendance for {attendance.Date:yyyy-MM-dd} has been deleted");
    }

    private static TimeSpan? ParseTimeOrNull(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        return TimeSpan.TryParse(value, out var ts) ? ts : null;
    }
}




