namespace _3PPASSWORD.BACKEND.Models.DTOs;

public class PasswordGeneratorOptionsDto
{
    public int Length { get; set; } = 12;
    public bool IncludeUppercase { get; set; } = true;
    public bool IncludeLowercase { get; set; } = true;
    public bool IncludeNumbers { get; set; } = true;
    public bool IncludeSymbols { get; set; } = true;
}
