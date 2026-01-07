
using Microsoft.EntityFrameworkCore;

public class EventRepository : IEventRepositoryInterface
{
    private readonly AppDbContext _context;

    public EventRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Event> AddAsync(Event entity)
    {
        _context.Events.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<EventParticipation?> AttendEvent(int UserId, int EventId)
    {
        Event? @event = await _context.Events
        .Include(e => e.Participants)
        .FirstOrDefaultAsync(ev => ev.Id == EventId);

        Employee? employee =  await _context.Employees.FirstOrDefaultAsync(emp => emp.Id == UserId);

        if(@event == null || employee == null) return null;

        if (@event.Participants == null)
            @event.Participants = new List<EventParticipation>();

        EventParticipation? eventParticipation = @event.Participants.FirstOrDefault(p => p.UserId == UserId);
        if (eventParticipation!= null)
            return eventParticipation;

        eventParticipation = new EventParticipation
        {
            UserId = UserId,
            EventId = EventId,
            Status = "coming"
        };
        @event.Participants.Add(eventParticipation);
        await _context.SaveChangesAsync();
        return eventParticipation;
    }

    public async Task<bool> CancelAttendance(int UserId, int EventId)
    {
        Event? @event = await  _context.Events
        .FirstOrDefaultAsync(ev => ev.Id == EventId);

        Employee? employee =  await _context.Employees
        .Include(e => e.EventParticipations)
        .FirstOrDefaultAsync(emp => emp.Id == UserId);

        if(@event == null || employee == null) return false;
        if (@event.Participants == null) return false;

        EventParticipation?  participation = @event.Participants.FirstOrDefault(p => p.UserId == UserId);
        if(participation  == null) return false;
        @event.Participants.Remove(participation);
        await _context.SaveChangesAsync();



        return true;
    }

    

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _context.Events.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Event>> GetAllAsync()
    {
        return await _context.Events
        .Include(e => e.Creator)      
        .Include(e => e.Participants)
        .ToListAsync();
    }

    public async Task<Event?> GetByIdAsync(int id)
    {
        return await _context.Events
        .Include(e => e.Creator)                     
        .Include(e => e.Participants)                
        .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<bool> IsAttending(int UserId, int EventId)
    {
        Event? @event = await _context.Events
        .Include(e => e.Participants)
        .FirstOrDefaultAsync(ev => ev.Id == EventId);

        Employee? employee =  await _context.Employees.FirstOrDefaultAsync(emp => emp.Id == UserId);

        if(@event == null || employee == null) return false;

        if (@event.Participants == null)
            @event.Participants = new List<EventParticipation>();

        EventParticipation? eventParticipation = @event.Participants.FirstOrDefault(p => p.UserId == UserId);
        if (eventParticipation!= null)
            return  true;
        return false;

    }

    public async Task<Event?> UpdateAsyncDto(EventUpdateDto dto)
    {
        var existingEvent = await _context.Events.FindAsync(dto.Id);
        if (existingEvent == null)
        {
            return null;
        }

        existingEvent.Title = dto.Title;
        existingEvent.Description = dto.Description;
        existingEvent.EventDate = dto.EventDate;
        existingEvent.StartTime = dto.StartTime;
        existingEvent.EndTime = dto.EndTime;

        await _context.SaveChangesAsync();
        return existingEvent;
    }

    public async Task UpdateAsync(Event entity)
    {
        throw new NotImplementedException();
    }

        

    
}