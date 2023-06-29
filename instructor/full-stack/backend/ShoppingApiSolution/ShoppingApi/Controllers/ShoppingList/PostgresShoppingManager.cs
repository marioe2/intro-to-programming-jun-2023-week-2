using Microsoft.EntityFrameworkCore;
using ShoppingApi.Data;

namespace ShoppingApi.Controllers.ShoppingList;

public class PostgresShoppingManager : IManageTheShoppingList
{
    private readonly ShoppingDataContext _context;

    public PostgresShoppingManager(ShoppingDataContext context)
    {
        _context = context;
    }

    public async Task<ShoppingListItemModel> AddItemAsync(ShoppingListItemCreateModel model)
    {
        // SLICM -> SLE
        var entityToAdd = new ShoppingListEntity
        {
            DateAdded = DateTime.UtcNow,
            Description = model.Description,
            Purchased = false,
        };
        _context.ShoppingList.Add(entityToAdd);
        await _context.SaveChangesAsync();

        // SLE -> SLIM

        var response = new ShoppingListItemModel
        {
            Id = entityToAdd.Id.ToString(),
            Purchased = entityToAdd.Purchased,
            Description = entityToAdd.Description
        };
        return response;
    }

    public async Task<CollectionResponse<ShoppingListItemModel>> GetShoppingListAsync()
    {
        var results = await _context.ShoppingList
            .Select(item => new ShoppingListItemModel
            {
                Id = item.Id.ToString(),
                Description = item.Description,
                Purchased = item.Purchased,
            })
            .ToListAsync();

        return new CollectionResponse<ShoppingListItemModel>()
        {
            Data = results
        };
    }

    public async Task<bool> MarkAsPurchasedAsync(ShoppingListItemModel request)
    {
        var id = int.Parse(request.Id);
        var savedItem = await _context.ShoppingList.SingleOrDefaultAsync(item => item.Id == id);
        if (savedItem != null)
        {
            savedItem.Purchased = true;
            await _context.SaveChangesAsync();
            return true;
        } else
        {
            return false;
        }
    }
}
