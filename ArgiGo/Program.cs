using ArgiGo.Database.Mapping;
using ArgiGo.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var MyAllowSpecificOrigins = "_MyAllowSubdomainPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200").AllowAnyHeader();
                          policy.WithOrigins("www.argigo.com").AllowAnyHeader();
                          policy.WithOrigins("https://zealous-stone-0941ec500.3.azurestaticapps.net").AllowAnyHeader();
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
builder.Services.AddScoped<KotobaService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddDbContext<ArgiGoContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProdConnection"))
);

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

//Creates the database

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<ArgiGoContext>();

    dataContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
