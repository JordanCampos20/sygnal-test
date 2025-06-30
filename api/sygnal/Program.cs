using Microsoft.EntityFrameworkCore;
using sygnal.Context;
using sygnal.Interfaces.Repositories;
using sygnal.Interfaces.Services;
using sygnal.Repositories;
using sygnal.Services;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Asp.Versioning.ApiExplorer;
using Scalar.AspNetCore;
using Asp.Versioning;
using sygnal.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
  options
  .AddPolicy(ConfigUtil.CorsName,
    corsPolicyBuilder => corsPolicyBuilder
      .WithOrigins("http://localhost:3000", ConfigUtil.CorsUrl)
      .AllowAnyHeader()
      .AllowAnyMethod());
});

builder.Services
            .AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(ConfigUtil.DatabaseConnection));

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services
.AddApiVersioning(options =>
{
  options.DefaultApiVersion = new ApiVersion(1, 0);
  options.ReportApiVersions = true;
  options.RouteConstraintName = "version";
  options.UnsupportedApiVersionStatusCode = 400;
})
.AddApiExplorer(options =>
{
  options.GroupNameFormat = "'v'VVV";
  options.SubstituteApiVersionInUrl = true;
});

string[] versions = ["v1"];

foreach (var version in versions)
{
  builder.Services.AddOpenApi(version, options =>
  {
    options.AddDocumentTransformer((document, context, _) =>
    {
      var descriptionProvider = context.ApplicationServices.GetRequiredService<IApiVersionDescriptionProvider>();
      var versionDescription = descriptionProvider.ApiVersionDescriptions.FirstOrDefault(x => x.GroupName == version);
      document.Info.Version = versionDescription?.ApiVersion.ToString();
      return Task.CompletedTask;
    });

    options.AddOperationTransformer((operation, context, _) =>
    {
      var apiDescription = context.Description;
      operation.Deprecated = apiDescription.IsDeprecated();
      return Task.CompletedTask;
    });
  });
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
  app.MapScalarApiReference(options =>
  {
    options.WithTitle("SygnalGroup")
          .WithTheme(ScalarTheme.Saturn)
          .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient)
          .WithDarkModeToggle(true);

    options.AddDocuments(versions);
  });
}

app.UseCors(ConfigUtil.CorsName);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }