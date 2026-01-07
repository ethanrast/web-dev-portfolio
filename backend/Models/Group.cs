public class Group
{
    public int Id { get; set; }
    public string GroupName { get; set; } = null!;
    public string Description { get; set; } = null!;

    // Navigation property
    public ICollection<GroupMembership>? Members { get; set; }
}
