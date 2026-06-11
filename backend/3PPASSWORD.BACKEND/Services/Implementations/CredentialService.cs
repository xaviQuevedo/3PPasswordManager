using Microsoft.EntityFrameworkCore;
using _3PPASSWORD.BACKEND.Data;
using _3PPASSWORD.BACKEND.Models.DTOs;
using _3PPASSWORD.BACKEND.Services.Interfaces;

namespace _3PPASSWORD.BACKEND.Services.Implementations;

public class CredentialService : ICredentialService
{
    private readonly ApplicationDbContext _context;

    public CredentialService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CredentialDto>> GetAllAsync()
    {
        return await _context.Credentials
            .OrderBy(c => c.SystemName)
            .Select(c => new CredentialDto
            {
                Id = c.Id,
                SystemName = c.SystemName,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .ToListAsync();
    }
}
