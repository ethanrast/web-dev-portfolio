using Microsoft.EntityFrameworkCore;

public class OfficeAttendanceRepository : IOfficeAttendanceRepository
{
    private readonly AppDbContext _context;

    public OfficeAttendanceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OfficeAttendance>> GetUserAttendanceAsync(int userId)
    {
        return await _context.OfficeAttendances
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.Date)
            .ToListAsync();
    }

    public async Task<OfficeAttendance?> GetByIdAsync(int id)
    {
        return await _context.OfficeAttendances.FindAsync(id);
    }

    public async Task<OfficeAttendance?> GetByDateAsync(int userId, DateTime date)
    {
        
        var dateOnly = date.Date;
        return await _context.OfficeAttendances
            .FirstOrDefaultAsync(a => a.UserId == userId && a.Date.Date == dateOnly);
    }

    public async Task<OfficeAttendance> AddAsync(OfficeAttendance attendance)
    {
        _context.OfficeAttendances.Add(attendance);
        await _context.SaveChangesAsync();
        return attendance;
    }

    public async Task UpdateAsync(OfficeAttendance attendance)
    {
        _context.OfficeAttendances.Update(attendance);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var attendance = await GetByIdAsync(id);
        if (attendance != null)
        {
            _context.OfficeAttendances.Remove(attendance);
            await _context.SaveChangesAsync();
        }
    }
}