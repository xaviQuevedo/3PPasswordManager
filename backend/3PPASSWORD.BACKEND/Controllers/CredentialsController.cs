using Microsoft.AspNetCore.Mvc;
using _3PPASSWORD.BACKEND.Services.Interfaces;
using _3PPASSWORD.BACKEND.Models.DTOs;

namespace _3PPASSWORD.BACKEND.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CredentialsController : ControllerBase
{
    private readonly ICredentialService _credentialService;
    
    public CredentialsController(ICredentialService credentialService)
    {
        _credentialService = credentialService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var credentials = await _credentialService.GetAllAsync();
        return Ok(credentials);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateCredentialDto dto)
    {
        try
        {
            var result = await _credentialService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetAll),
                new { id = result.Id },
                result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var credential = await _credentialService.GetByIdAsync(id);
        if (credential is null)
        {
            return NotFound("Credential not found");
        }
        return Ok(credential);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update( 
        Guid id, 
        [FromBody] UpdateCredentialDto dto)
    {
        try
        {
            var result = await _credentialService.UpdateAsync(id, dto);

            if (result is null)
            {
                return NotFound("Credential not found");
            }

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _credentialService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound("Credential not found");
        }
        return NoContent();
    }
}
