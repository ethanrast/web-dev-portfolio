using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Admin> Admins => Set<Admin>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventParticipation> EventParticipations => Set<EventParticipation>();
    public DbSet<OfficeAttendance> OfficeAttendances => Set<OfficeAttendance>();
    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<RoomBooking> RoomBookings => Set<RoomBooking>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<GroupMembership> GroupMemberships => Set<GroupMembership>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseSqlite("Data Source=Office.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Employee>()
            .Property(e => e.Role)
            .HasConversion<string>();
        // Configure composite key for EventParticipation
        modelBuilder.Entity<EventParticipation>()
            .HasKey(ep => new { ep.EventId, ep.UserId });

        modelBuilder.Entity<Event>()
            .HasOne(e => e.Creator)
            .WithMany(u => u.CreatedEvents)
            .HasForeignKey(e => e.CreatedBy);

        modelBuilder.Entity<EventParticipation>()
            .HasOne(ep => ep.Event)
            .WithMany(e => e.Participants)
            .HasForeignKey(ep => ep.EventId);

        modelBuilder.Entity<EventParticipation>()
            .HasOne(ep => ep.User)
            .WithMany(u => u.EventParticipations)
            .HasForeignKey(ep => ep.UserId);

        modelBuilder.Entity<GroupMembership>()
            .HasKey(gm => new { gm.UserId, gm.GroupId });

        modelBuilder.Entity<GroupMembership>()
            .HasOne(gm => gm.User)
            .WithMany(u => u.GroupMemberships)
            .HasForeignKey(gm => gm.UserId);

        modelBuilder.Entity<GroupMembership>()
            .HasOne(gm => gm.Group)
            .WithMany(g => g.Members)
            .HasForeignKey(gm => gm.GroupId);

        modelBuilder.Entity<RoomBooking>()
            .HasKey(rb => new { rb.UserId, rb.RoomId });

        modelBuilder.Entity<RoomBooking>()
            .HasOne(rb => rb.User)
            .WithMany(u => u.RoomBookings)
            .HasForeignKey(rb => rb.UserId);

        modelBuilder.Entity<RoomBooking>()
            .HasOne(rb => rb.Room)
            .WithMany(r => r.Bookings)
            .HasForeignKey(rb => rb.RoomId);
    }
}