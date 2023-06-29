using Microsoft.AspNetCore.Mvc;

namespace ShoppingApi.Controllers;

public class StatusController : ControllerBase
{

    private readonly ILookupTheStatus _statusLookup;

    public StatusController(ILookupTheStatus statusLookup)
    {
        _statusLookup = statusLookup;
    }

    // GET /status
    [HttpGet("/status")]
    public async Task<ActionResult> GetTheStatus()
    {

        GetStatusResponse response = await _statusLookup.GetCurrentStatusAsync();
        return Ok(response); // 200 Ok.
    }
}
