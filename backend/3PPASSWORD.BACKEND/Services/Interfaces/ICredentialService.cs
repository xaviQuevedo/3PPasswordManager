using _3PPASSWORD.BACKEND.Models.DTOs;

namespace _3PPASSWORD.BACKEND.Services.Interfaces;

public interface ICredentialService
{
    Task<List<CredentialDto>> GetAllAsync();
    Task<CredentialDto> CreateAsync(CreateCredentialDto dto);
}
