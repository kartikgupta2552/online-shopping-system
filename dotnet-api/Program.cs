var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/health", () => "Healthy :)");
app.MapGet("/greet", (string user) => $"Hello, {user}! Welcome to ApnaCart.");

app.Run();
