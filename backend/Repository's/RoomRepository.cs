using Microsoft.EntityFrameworkCore;

public class RoomRepository : IRepo<Room>
{
    private readonly AppDbContext _context;

    public RoomRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Room> AddAsync(Room entity)
    {
        _context.Rooms.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        var room = await _context.Rooms.FindAsync(id);
        if (room != null)
        {
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Room>> GetAllAsync()
    {
        return await _context.Rooms
            .Include(r => r.Bookings) 
            .ToListAsync();
    }

    public async Task<Room?> GetByIdAsync(int id)
    {
        return await _context.Rooms
            .Include(r => r.Bookings) 
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task UpdateAsync(Room entity)
    {
        var room = await _context.Rooms.FindAsync(entity.Id);
        if (room != null)
        {
            room.RoomName = entity.RoomName;
            room.Capacity = entity.Capacity;
            room.Location = entity.Location;

            await _context.SaveChangesAsync();
        }
    }
}
