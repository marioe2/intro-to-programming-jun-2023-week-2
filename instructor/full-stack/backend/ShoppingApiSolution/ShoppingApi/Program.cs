using Microsoft.EntityFrameworkCore;
using ShoppingApi.Controllers;
using ShoppingApi.Controllers.ShoppingList;
using ShoppingApi.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var shoppingConnectionString = builder.Configuration.GetConnectionString("shopping") ?? throw new Exception("No Connection String for Shopping");

builder.Services.AddDbContext<ShoppingDataContext>(options =>
{
    options.UseNpgsql(shoppingConnectionString);
});

builder.Services.AddScoped<ILookupTheStatus, StatusLookup>();
builder.Services.AddScoped<IManageTheShoppingList, PostgresShoppingManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseAuthorization();

app.MapControllers();

app.Run();
