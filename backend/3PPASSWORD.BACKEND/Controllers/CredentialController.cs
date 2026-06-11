using Microsoft.AspNetCore.Mvc;
using _3PPASSWORD.BACKEND.Services.Interfaces;

namespace _3PPASSWORD.BACKEND.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CredentialController : ControllerBase
{
    private readonly ICredentialService _credentialService;
    
    public CredentialController(ICredentialService credentialService)
    {
        _credentialService = credentialService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var credentials = await _credentialService.GetAllAsync();
        return Ok(credentials);
    }
}
