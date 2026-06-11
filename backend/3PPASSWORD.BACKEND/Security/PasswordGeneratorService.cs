using _3PPASSWORD.BACKEND.Models.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace _3PPASSWORD.BACKEND.Security;

public class PasswordGeneratorService : IPasswordGeneratorService
{
    private const string Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private const string Lowercase = "abcdefghijklmnopqrstuvwxyz";
    private const string Numbers = "0123456789";
    private const string Symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    public string Generate(PasswordGeneratorOptionsDto options)
    {
        if (options.Length < 8)
        {
            throw new ArgumentException("Password length must be at least 8 characters.");
        }

        var characterPool = new StringBuilder();

        if (options.IncludeUppercase)
            characterPool.Append(Uppercase);

        if (options.IncludeLowercase)
            characterPool.Append(Lowercase);

        if (options.IncludeNumbers)
            characterPool.Append(Numbers);

        if (options.IncludeSymbols)
            characterPool.Append(Symbols);

        if (characterPool.Length == 0)
        {
            throw new ArgumentException("At least one character type must be included.");
        }

        var password = new StringBuilder();

        for (int i = 0; i < options.Length; i++)
        {
            var index = RandomNumberGenerator.GetInt32(characterPool.Length);
            password.Append(characterPool[index]);
        }
        return password.ToString();
    }

}
