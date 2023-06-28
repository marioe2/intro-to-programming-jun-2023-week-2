namespace ShoppingApi.Models;

public record GetStatusResponse
{
    public string Message { get; set; } = string.Empty;
    public DateTimeOffset LastChecked { get; init; }
}
