using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.Mapping
{
    public class ArgiGoContext : DbContext
    {
        public ArgiGoContext(DbContextOptions<ArgiGoContext> options): base(options) 
        {
            
        }

        public DbSet<Doushi> Doushi { get; set; }

        public DbSet<Keiyoushi> Keiyoushi { get; set; }

        public DbSet<Meishi> Meishi { get; set; }

        public DbSet<Fukushi> Fukushi { get; set; }

        public DbSet<Example> Examples { get; set; }

        public DbSet<Exam> Exams { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<Chapter> Chapters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doushi>().ToTable(nameof(Doushi));
            modelBuilder.Entity<Keiyoushi>().ToTable(nameof(Keiyoushi));
            modelBuilder.Entity<Meishi>().ToTable(nameof(Meishi));
            modelBuilder.Entity<Fukushi>().ToTable(nameof(Fukushi));
            modelBuilder.Entity<Example>().ToTable(nameof(Examples));
            modelBuilder.Entity<Book>().ToTable(nameof(Books));
            modelBuilder.Entity<Chapter>().ToTable(nameof(Chapters));
            modelBuilder.Entity<Exam>().ToTable(nameof(Exams));

        }
    }
}
