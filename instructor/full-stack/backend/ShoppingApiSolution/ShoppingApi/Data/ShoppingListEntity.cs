namespace ShoppingApi.Data;

public class ShoppingListEntity
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool Purchased { get; set; }

    public DateTimeOffset DateAdded { get; set; }
    
}