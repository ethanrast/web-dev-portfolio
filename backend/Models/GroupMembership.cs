
using Microsoft.EntityFrameworkCore;

public class GroupMembership
{
    public int UserId { get; set; }
    public int GroupId { get; set; }

    // Navigation properties
    public Employee User { get; set; } = null!;
    public Group Group { get; set; } = null!;
}
