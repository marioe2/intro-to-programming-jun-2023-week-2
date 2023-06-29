using Microsoft.EntityFrameworkCore;
using ShoppingApi.Data;

namespace ShoppingApi.Controllers;

public class StatusLookup : ILookupTheStatus
{

    private readonly ShoppingDataContext _context;

    public StatusLookup(ShoppingDataContext context)
    {
        _context = context;
    }

    public async Task<GetStatusResponse> GetCurrentStatusAsync()
    {
        // find the latest status saved in the database.
        // if the status was saved within 10 minutes from now, use that - return that.
        // if there is no status, or it is stale (>10 old) write a new status to the datbase, and return THAT.
        var savedStatus = await _context.StatusMessages.OrderByDescending(m => m.LastChecked).FirstOrDefaultAsync();

        if (savedStatus is null)
        {
            var entityToSave = GetFreshStatusEntity();
            _context.StatusMessages.Add(entityToSave);
            await _context.SaveChangesAsync();
            savedStatus = entityToSave;
        }
        else
        {

            if (IsStale(savedStatus))
            {
                var entityToSave = GetFreshStatusEntity();
                _context.StatusMessages.Add(entityToSave);
                await _context.SaveChangesAsync();
                savedStatus = entityToSave;
            }

        }

        // Mapping - copying from one thing to another.
        var response = new GetStatusResponse
        {
            Message = savedStatus!.Message,
            LastChecked = savedStatus.LastChecked,
        };
        return response;
    }

    private bool IsStale(StatusEntity statusEntity)
    {
        var stale = TimeSpan.FromMinutes(5);
        return DateTime.Now.ToUniversalTime() - statusEntity.LastChecked > stale;

    }
    private StatusEntity GetFreshStatusEntity()
    {
        return new StatusEntity
        {
            LastChecked = DateTime.Now.ToUniversalTime(),
            Message = "Looks Good"
        };
    }
}