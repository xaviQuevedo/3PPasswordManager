namespace _3PPASSWORD.BACKEND.Models.DTOs
{
    public class CreateCredentialDto
    {
        public string SystemName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string RepeatedPassword { get; set; } = string.Empty;
    }
}
