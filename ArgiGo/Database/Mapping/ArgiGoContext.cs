using ArgiGo.Database.ClassMappings;
using ArgiGo.Model.Entities;
using Microsoft.AspNetCore.Hosting.Server;
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
            modelBuilder.ApplyConfiguration(new DoushiConfiguration());
            modelBuilder.ApplyConfiguration(new KeiyoushiConfiguration());
            modelBuilder.ApplyConfiguration(new MeishiConfiguration());
            modelBuilder.ApplyConfiguration(new FukushiConfiguration());
            modelBuilder.ApplyConfiguration(new ExampleConfiguration());
            modelBuilder.ApplyConfiguration(new ExamConfiguration());
            modelBuilder.ApplyConfiguration(new BookConfiguration());
            modelBuilder.ApplyConfiguration(new ChapterConfiguration());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost,1433;Initial Catalog=ArgiGoConnection;User ID=sa;Password=Password1;Trust Server Certificate=true;", builder =>
            {
                builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            });
            base.OnConfiguring(optionsBuilder);
        }
    }
}
