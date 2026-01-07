using System.Text.Json.Serialization;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime EventDate { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int CreatedBy { get; set; }

    // Navigation properties
    public Employee? Creator { get; set; }
    public ICollection<EventParticipation>? Participants { get; set; }
}
