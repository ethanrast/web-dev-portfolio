using System.Linq;
using Microsoft.EntityFrameworkCore;

public class EventService : IEventInterface
{
    private readonly IEventRepositoryInterface _context;
    public EventService(IEventRepositoryInterface context)
    {
        _context = context;
    }

    public Task<EventParticipation?> AttendEvent(int UserId, int EventId)
    {
        return _context.AttendEvent(UserId,EventId);
    }

    public Task<bool> CancelAttendance(int UserId, int EventId)
    {
        return _context.CancelAttendance(UserId,EventId);
    }

    public Task<Event> CreateAsync(Event emp)
    {
        return _context.AddAsync(emp);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing =  _context.GetByIdAsync(id);
        if (existing == null) return false;

        await _context.DeleteAsync(id);
        return true;
    }

    public Task<IEnumerable<Event>> GetAllAsync()
    {
        return _context.GetAllAsync();
    }

    public Task<Event?> GetByIdAsync(int id)
    {
        return _context.GetByIdAsync(id);
    }

    public Task<bool> IsAttending(int UserId, int EventId)
    {
        return _context.IsAttending( UserId,  EventId);

    }

    public Task<Event?> UpdateAsync(EventUpdateDto dto)
    {
        return _context.UpdateAsyncDto(dto);
    }

   
}