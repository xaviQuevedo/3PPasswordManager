namespace _3PPASSWORD.BACKEND.Security;

public interface IEncryptionService
{
    string Encrypt(string plaintext);
    string Decrypt(string ciphertext);

}
