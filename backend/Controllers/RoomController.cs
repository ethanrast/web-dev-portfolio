using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class RoomController : ControllerBase
{
    private readonly IRepo<Room> _roomRepository;

    public RoomController(IRepo<Room> roomRepository)
    {
        _roomRepository = roomRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRooms()
    {
        var rooms = await _roomRepository.GetAllAsync();
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomById(int id)
    {
        var room = await _roomRepository.GetByIdAsync(id);
        if (room == null)
            return NotFound("Room not found.");

        return Ok(room);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRoom([FromBody] Room room)
    {
        if (room == null)
            return BadRequest("Room data is required.");

        var createdRoom = await _roomRepository.AddAsync(room);
        return CreatedAtAction(nameof(GetRoomById), new { id = createdRoom.Id }, createdRoom);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room room)
    {
        if (room == null || room.Id != id)
            return BadRequest("Room ID mismatch.");

        var existingRoom = await _roomRepository.GetByIdAsync(id);
        if (existingRoom == null)
            return NotFound("Room not found.");

        await _roomRepository.UpdateAsync(room);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        var existingRoom = await _roomRepository.GetByIdAsync(id);
        if (existingRoom == null)
            return NotFound("Room not found.");

        await _roomRepository.DeleteAsync(id);
        return NoContent();
    }
}
