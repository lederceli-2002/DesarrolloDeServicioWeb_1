using Microsoft.EntityFrameworkCore;
using ProyectoFinalBack.Data;

var builder = WebApplication.CreateBuilder(args);

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.WithOrigins("http://localhost:5176", "http://localhost:3000") // Puertos de Vite / Create React App
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
//Registro de la conexion con la BD
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
