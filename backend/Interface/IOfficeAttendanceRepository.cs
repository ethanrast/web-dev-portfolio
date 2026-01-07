public interface IOfficeAttendanceRepository
{
    Task<IEnumerable<OfficeAttendance>> GetUserAttendanceAsync(int userId);
    Task<OfficeAttendance?> GetByIdAsync(int id);
    Task<OfficeAttendance?> GetByDateAsync(int userId, DateTime date);
    Task<OfficeAttendance> AddAsync(OfficeAttendance attendance);
    Task UpdateAsync(OfficeAttendance attendance);
    Task DeleteAsync(int id);
}