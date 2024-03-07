using Datos.Mapping;
using Entidades.Usuarios;
using Microsoft.EntityFrameworkCore;
namespace Datos
{
    public class DBContextSistema: DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public DBContextSistema() { }
        public DBContextSistema(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Conexion");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UsuarioMap());
        }






    }
    


}