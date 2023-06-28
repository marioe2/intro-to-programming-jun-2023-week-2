namespace ShoppingApi.Controllers;

public interface ILookupTheStatus
{
    Task<GetStatusResponse> GetCurrentStatusAsync();
}