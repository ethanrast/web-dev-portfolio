using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;


public class EventParticipation
{
    public int EventId { get; set; }
    public int UserId { get; set; }
    public string Status { get; set; } = null!;

    // Navigation properties
    [JsonIgnore] public Event Event { get; set; } = null!;
    [JsonIgnore] public Employee User { get; set; } = null!;
}
