var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/health", () => "Healthy :)");
app.MapGet("/greet", (string user) => $"Hello, {user}! Welcome to ApnaCart.");
app.MapGet("/recommendations",(string productId) =>
{
    return new[] {
        new {productId = "123",name = "Soap"},
        new {productId = "222",name = "Shampoo"},
        new { productId = "555", name = "Toothpaste" },
        new { productId = "101", name = "Body Lotion" },
        new { productId = "102", name = "Face Cream" },
        new { productId = "103", name = "Sunscreen" },
        new { productId = "104", name = "Conditioner" },
        new { productId = "105", name = "Hair Gel" },
        new { productId = "106", name = "Dental Floss" },
        new { productId = "107", name = "Mouthwash" },
        new { productId = "108", name = "Hand Sanitizer" },
        new { productId = "109", name = "Lip Balm" },
        new { productId = "110", name = "Body Wash" },
        new { productId = "111", name = "Deodorant" },
        new { productId = "112", name = "Hair Dryer" }
    };
});

app.Run();
