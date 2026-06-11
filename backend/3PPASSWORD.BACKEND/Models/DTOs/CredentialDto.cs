namespace _3PPASSWORD.BACKEND.Models.DTOs;

public class CredentialDto
{
    public Guid Id { get; set; }
    public string SystemName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
