using Microsoft.EntityFrameworkCore;
using sygnal.Context;
using sygnal.Interfaces.Repositories;
using sygnal.Interfaces.Services;
using sygnal.Repositories;
using sygnal.Services;
using sygnal.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services
            .AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(ConfigUtil.DatabaseConnection));

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
