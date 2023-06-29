namespace ShoppingApi.Controllers.ShoppingList;

public class ShoppingListController : ControllerBase
{

    private readonly IManageTheShoppingList _shoppingListManager;

    public ShoppingListController(IManageTheShoppingList shoppingListManager)
    {
        _shoppingListManager = shoppingListManager;
    }

    [HttpGet("/shopping-list")]
    public async Task<ActionResult> GetShoppingList()
    {

        CollectionResponse<ShoppingListItemModel> response = await _shoppingListManager.GetShoppingListAsync();
        
        return Ok(response);
        
    }

    [HttpPost("/shopping-list")]
    public async Task<ActionResult> AddShoppingListItem([FromBody] ShoppingListItemCreateModel model)
    {
        if (ModelState.IsValid)
        {
            ShoppingListItemModel response = await _shoppingListManager.AddItemAsync(model);
            
            return Ok(response);
        } else
        {
            return BadRequest();
        }
    }

    [HttpPut("/completed-shopping-items/{itemId}")]
    public async Task<ActionResult> MarkItemAsPurchased(string itemId, [FromBody] ShoppingListItemModel request)
    {
        if(itemId != request.Id)
        {
            return BadRequest();
        }

        bool wasUpdated = await _shoppingListManager.MarkAsPurchasedAsync(request);
        if(wasUpdated)
        {
            return NoContent();
        } else
        {
            return NotFound();
        }
    }
}
