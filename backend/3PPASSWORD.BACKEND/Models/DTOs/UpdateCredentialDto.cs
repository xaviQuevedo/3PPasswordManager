namespace _3PPASSWORD.BACKEND.Models.DTOs;

public class UpdateCredentialDto
{
    public string SystemName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string RepeatPassword { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
}
