using ProyectoFinalBack.Entidades;
using Microsoft.EntityFrameworkCore;

namespace ProyectoFinalBack.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
