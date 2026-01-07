public interface IOfficeAttendanceInterface
{
    Task<IEnumerable<OfficeAttendance>> GetUserAttendanceAsync(int userId);
    Task<OfficeAttendance?> GetByIdAsync(int id);
    Task<OfficeAttendance?> GetByDateAsync(int userId, DateTime date);
    Task<OfficeAttendance> CreateAsync(OfficeAttendance attendance);
    Task<OfficeAttendance?> UpdateAsync(int id, OfficeAttendance attendance);
    Task<bool> DeleteAsync(int id);
}