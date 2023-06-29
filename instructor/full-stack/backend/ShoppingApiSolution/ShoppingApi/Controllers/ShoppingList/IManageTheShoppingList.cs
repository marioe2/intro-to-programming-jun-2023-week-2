namespace ShoppingApi.Controllers.ShoppingList;

public interface IManageTheShoppingList
{
    Task<ShoppingListItemModel> AddItemAsync(ShoppingListItemCreateModel model);
    Task<CollectionResponse<ShoppingListItemModel>> GetShoppingListAsync();
    Task<bool> MarkAsPurchasedAsync(ShoppingListItemModel request);
}