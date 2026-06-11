using _3PPASSWORD.BACKEND.Data;
using _3PPASSWORD.BACKEND.Models.DTOs;
using _3PPASSWORD.BACKEND.Models.Entities;
using _3PPASSWORD.BACKEND.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

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
                Username = c.Username,
                Url = c.Url,
                Notes = c.Notes,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .ToListAsync();
    }

    public async Task<CredentialDto> CreateAsync(CreateCredentialDto dto)
    {
        if (dto.Password != dto.RepeatPassword)
        {
            throw new ArgumentException("Passwords do not match");
        }

        var credential = new Credential
        {
            Id = Guid.NewGuid(),
            SystemName = dto.SystemName,
            Username = dto.Username,
            Url = dto.Url,
            Notes = dto.Notes,
            EncryptedPassword = dto.Password,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Credentials.Add(credential);

        await _context.SaveChangesAsync();

        return new CredentialDto
        {
            Id = credential.Id,
            SystemName = credential.SystemName,
            Username = credential.Username,
            Url = credential.Url,
            Notes = credential.Notes,
            CreatedAt = credential.CreatedAt,
            UpdatedAt = credential.UpdatedAt
        };
    }
    public async Task<CredentialDto?> GetByIdAsync(Guid id)
    {
        return await _context.Credentials
            .Where(c => c.Id == id)
            .Select(c => new CredentialDto
            {
                Id = c.Id,
                SystemName = c.SystemName,
                Username = c.Username,
                Url = c.Url,
                Notes = c.Notes,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<CredentialDto?> UpdateAsync(Guid id, UpdateCredentialDto dto)
    {
        if (dto.Password != dto.RepeatPassword)
        {
            throw new ArgumentException("Passwords do not match");
        }

        var credential = await _context.Credentials.FindAsync(id);

        if (credential is null)
        {
            return null;
        }

        credential.SystemName = dto.SystemName;
        credential.EncryptedPassword = dto.Password;
        credential.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return new CredentialDto
        {
            Id = credential.Id,
            SystemName = credential.SystemName,
            Username = credential.Username,
            Url = credential.Url,
            Notes = credential.Notes,
            CreatedAt = credential.CreatedAt,
            UpdatedAt = credential.UpdatedAt
        };
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var credential = await _context.Credentials.FindAsync(id);

        if (credential is null)
        {
            return false;
        }

        _context.Credentials.Remove(credential);
        await _context.SaveChangesAsync();

        return true;
    }

}
