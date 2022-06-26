using ASPDotNetTodos_React.DAL;
using ASPDotNetTodos_React.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoDbContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration["ConnectionStrings:TodoStr"]);
    opts.EnableSensitiveDataLogging(true);
});

builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy =>
{
    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:44450", "http://localhost:3000");
}));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(s =>
{
    s.SwaggerDoc("v1", new() { Title = "Todo List API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "CodebrainsTodos v1");
    });
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");

app.MapControllers();


/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;*/

app.Run();
