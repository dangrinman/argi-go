using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class MeishiConfiguration : IEntityTypeConfiguration<Meishi>
    {
        public void Configure(EntityTypeBuilder<Meishi> builder)
        {
            builder.ToTable(nameof(Meishi));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name);

            builder.Property(x => x.Kanji);

            builder.HasIndex(x => x.Kanji).IsUnique(true);

            builder.Property(x => x.Translation);

            builder.HasMany(x => x.Examples)
                   .WithOne(t => t.Meishi)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Chapters)
                   .WithMany(x => x.Meishi);

            builder.HasMany(x => x.Exams)
                   .WithMany(x => x.Meishi);
        }
    }
}
