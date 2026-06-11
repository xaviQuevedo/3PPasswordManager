namespace _3PPASSWORD.BACKEND.Models.Entities
{
    public class Credential
    {
        public Guid Id { get; set; }
        public string SystemName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string EncryptedPassword { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
