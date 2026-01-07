public interface IEventInterface
{
    Task<IEnumerable<Event>> GetAllAsync();
    Task<Event?> GetByIdAsync(int id);
    Task<Event> CreateAsync(Event entity);
    Task<Event?> UpdateAsync(EventUpdateDto dto);
    Task<bool> DeleteAsync(int id);

    Task<EventParticipation?> AttendEvent(int UserId, int EventId);
    Task<bool> CancelAttendance(int UserId, int EventId);
    Task <bool> IsAttending(int UserId, int EventId);

}