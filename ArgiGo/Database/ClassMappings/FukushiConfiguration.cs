using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class FukushiConfiguration : IEntityTypeConfiguration<Fukushi>
    {
        public void Configure(EntityTypeBuilder<Fukushi> builder)
        {
            builder.ToTable(nameof(Fukushi));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name);

            builder.Property(x => x.Kanji);

            builder.HasIndex(x => x.Kanji).IsUnique(true);

            builder.Property(x => x.Translation);

            builder.HasMany(x => x.Examples)
                   .WithOne(t => t.Fukushi)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Chapters)
                   .WithMany(x => x.Fukushi);

            builder.HasMany(x => x.Exams)
                   .WithMany(x => x.Fukushi);
        }
    }
}
