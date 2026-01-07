using System.Text.Json.Serialization;

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string Password { get; set; } = null!;

    // Navigation properties
    [JsonIgnore] public ICollection<Admin>? AdminRoles { get; set; }
    [JsonIgnore] public ICollection<OfficeAttendance>? Attendances { get; set; }
    [JsonIgnore] public ICollection<EventParticipation>? EventParticipations { get; set; }
    [JsonIgnore] public ICollection<GroupMembership>? GroupMemberships { get; set; }
    [JsonIgnore] public ICollection<RoomBooking>? RoomBookings { get; set; }
    [JsonIgnore] public ICollection<Event>? CreatedEvents { get; set; }
}
