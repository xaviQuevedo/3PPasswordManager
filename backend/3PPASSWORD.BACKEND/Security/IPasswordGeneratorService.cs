using _3PPASSWORD.BACKEND.Models.DTOs;

namespace _3PPASSWORD.BACKEND.Security;

public interface IPasswordGeneratorService
{
    string Generate(PasswordGeneratorOptionsDto options);
}
