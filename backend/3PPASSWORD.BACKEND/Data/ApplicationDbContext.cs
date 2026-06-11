using Microsoft.EntityFrameworkCore;
using _3PPASSWORD.BACKEND.Models.Entities;

namespace _3PPASSWORD.BACKEND.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }
    public DbSet<Credential> Credentials => Set<Credential>();
}
