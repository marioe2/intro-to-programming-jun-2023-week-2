using System.ComponentModel.DataAnnotations;

namespace ShoppingApi.Models;


public record ShoppingListItemModel
{
    public string Id { get; set; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public bool Purchased { get; init; }
}



public record CollectionResponse<T>
{
    public List<T> Data { get; set; } = new();
}

public record ShoppingListItemCreateModel
{
    [Required, MinLength(3), MaxLength(50)]
    public string Description { get; init; } = string.Empty;
}