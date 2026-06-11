using System.Security.Cryptography;
using System.Text;

namespace _3PPASSWORD.BACKEND.Security;

public class EncryptionService : IEncryptionService
{
    private readonly string _key;

    public EncryptionService(IConfiguration configuration)
    {
        _key = configuration["Encryption:Key"]
            ?? throw new InvalidOperationException("Encryption key is not configured.");
    }

    public string Encrypt(string plaintext)
    {
        using var aes = Aes.Create();

        aes.Key = Encoding.UTF8.GetBytes(_key);
        aes.GenerateIV();

        using var encryptor = aes.CreateEncryptor();

        var plainBytes = Encoding.UTF8.GetBytes(plaintext);
        var encryptedBytes = encryptor.TransformFinalBlock(
            plainBytes, 
            0,
            plainBytes.Length);

        var result = aes.IV.Concat(encryptedBytes).ToArray();

        return Convert.ToBase64String(result);
    }

    public string Decrypt(string cipherText)
    {
        var fullBytes = Convert.FromBase64String(cipherText);

        using var aes = Aes.Create();

        aes.Key = Encoding.UTF8.GetBytes(_key);

        var iv = fullBytes.Take(16).ToArray();
        var encryptedBytes = fullBytes.Skip(16).ToArray();

        aes.IV = iv;

        using var decryptor = aes.CreateDecryptor();

        var decryptedBytes = decryptor.TransformFinalBlock(
            encryptedBytes,
            0,
            encryptedBytes.Length);

        return Encoding.UTF8.GetString(decryptedBytes);
    }
        
}
