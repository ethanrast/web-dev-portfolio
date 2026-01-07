public interface IRepo<T>
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}



public interface IEventRepositoryInterface : IRepo<Event>
{
    Task<EventParticipation?> AttendEvent(int UserId, int EventId);
    Task<bool> CancelAttendance(int UserId, int EventId);
    Task <bool> IsAttending(int UserId, int EventId);
    Task<Event?> UpdateAsyncDto(EventUpdateDto dto);

}

