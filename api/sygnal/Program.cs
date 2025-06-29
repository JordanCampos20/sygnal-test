using Microsoft.EntityFrameworkCore;
using sygnal.Context;
using sygnal.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services
            .AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(ConfigUtil.DatabaseConnection));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
