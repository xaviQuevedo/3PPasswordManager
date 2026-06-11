namespace _3PPASSWORD.BACKEND.Models.DTOs;

public class CredentialPasswordDto
{
    public Guid Id { get; set; }
    public string SystemName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
