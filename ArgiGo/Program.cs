using ArgiGo.Database.Mapping;
using ArgiGo.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var MyAllowSpecificOrigins = "_MyAllowSubdomainPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200").AllowAnyHeader();
                      });
});

builder.Services.AddScoped<ExampleServices>();
builder.Services.AddScoped<BookService>();
builder.Services.AddScoped<ChapterService>();
builder.Services.AddScoped<ExamService>();
builder.Services.AddScoped<DoushiService>();
builder.Services.AddScoped<KeiyoushiService>();
builder.Services.AddScoped<MeishiService>();
builder.Services.AddScoped<FukushiService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ArgiGoContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("ArgiGoConnection"))
);

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

//Creates the database

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<ArgiGoContext>();

    if (dataContext.Database.EnsureCreated()) 
    {
        dataContext.Database.Migrate();
    }

}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
