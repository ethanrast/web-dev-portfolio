var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); 
    options.Cookie.HttpOnly = true; 
});

builder.Services.AddDbContext<AppDbContext>();


// Room service
builder.Services.AddScoped<IRepo<Room>, RoomRepository>();

// Room booking
builder.Services.AddScoped<IRoomBookingRepository, RoomBookingRepository>();

// Employee services
builder.Services.AddScoped<IRepo<Employee>, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeInterface, EmployeeService>();

// Event services
builder.Services.AddScoped<IEventRepositoryInterface, EventRepository>();
builder.Services.AddScoped<IEventInterface, EventService>();

//  services
builder.Services.AddScoped<IRoomBookingRepository, RoomBookingRepository>();
builder.Services.AddScoped<IEventInterface, EventService>();

// Auth services
builder.Services.AddScoped<IAuthInterface, AuthService>(); 

// OfficeAttendance services - NEW
builder.Services.AddScoped<IOfficeAttendanceRepository, OfficeAttendanceRepository>();
builder.Services.AddScoped<IOfficeAttendanceInterface, OfficeAttendanceService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = false;
    });
builder.Services.AddAuthentication();
builder.Services.AddOptions();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // MUST match frontend origin
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
    c.RoutePrefix = string.Empty;
});

app.UseCors("ReactPolicy"); 
app.UseSession(); 
app.UseMiddleware<MySimpleMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();