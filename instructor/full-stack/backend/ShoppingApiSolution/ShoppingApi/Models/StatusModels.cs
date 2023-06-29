namespace ShoppingApi.Models;

public record GetStatusResponse
{
    public string Message { get; init; } = string.Empty;
    public DateTimeOffset LastChecked { get; init; }
}