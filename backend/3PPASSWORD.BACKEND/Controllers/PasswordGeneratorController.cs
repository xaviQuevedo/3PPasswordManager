using _3PPASSWORD.BACKEND.Models.DTOs;
using _3PPASSWORD.BACKEND.Security;
using Microsoft.AspNetCore.Mvc;

namespace _3PPASSWORD.BACKEND.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PasswordGeneratorController : ControllerBase
{
    private readonly IPasswordGeneratorService _passwordGeneratorService;

    public PasswordGeneratorController(IPasswordGeneratorService passwordGeneratorService)
    {
        _passwordGeneratorService = passwordGeneratorService;
    }

    [HttpPost]
    public IActionResult Generate([FromBody] PasswordGeneratorOptionsDto options)
    {
        try
        {
            var password = _passwordGeneratorService.Generate(options);

            return Ok(new GeneratedPasswordDto
            {
                Password = password
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
