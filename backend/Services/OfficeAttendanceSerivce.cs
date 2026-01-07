using Microsoft.EntityFrameworkCore;

public class OfficeAttendanceService : IOfficeAttendanceInterface
{
    private readonly IOfficeAttendanceRepository _repository;

    public OfficeAttendanceService(IOfficeAttendanceRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<OfficeAttendance>> GetUserAttendanceAsync(int userId)
    {
        return await _repository.GetUserAttendanceAsync(userId);
    }

    public async Task<OfficeAttendance?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<OfficeAttendance?> GetByDateAsync(int userId, DateTime date)
    {
        return await _repository.GetByDateAsync(userId, date);
    }

    public async Task<OfficeAttendance> CreateAsync(OfficeAttendance attendance)
    {
        return await _repository.AddAsync(attendance);
    }

    public async Task<OfficeAttendance?> UpdateAsync(int id, OfficeAttendance attendance)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return null;

        await _repository.UpdateAsync(attendance);
        return attendance;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}