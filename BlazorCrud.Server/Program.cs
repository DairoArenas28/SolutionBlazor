using BlazorCrud.Server.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("cadenaSQL");
}
else
{
    connection = Environment.GetEnvironmentVariable("cadenaSQL");
}

builder.Services.AddDbContext<DbcrudBlazorContext>(opciones =>
{
    opciones.UseSqlServer(connection);
}

);

builder.Services.AddCors(opciones => {
    opciones.AddPolicy("nuevaPolitica", app =>
    {
        //app.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
        app.WithOrigins("http://localhost:5167")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("nuevaPolitica");

app.UseAuthorization();

app.MapControllers();

app.Run();
