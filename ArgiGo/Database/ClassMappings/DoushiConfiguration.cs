using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArgiGo.Database.ClassMappings
{
    internal class DoushiConfiguration : IEntityTypeConfiguration<Doushi>
    {
        public void Configure(EntityTypeBuilder<Doushi> builder)
        {
            builder.ToTable(nameof(Doushi));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name);

            builder.HasIndex(x => x.Kanji).IsUnique(true);

            builder.Property(x => x.Translation);

            builder.Property(x => x.Group);

            builder.Property(x => x.TeKei);

            builder.Property(x => x.TaKei);

            builder.Property(x => x.JishoKei);

            builder.Property(x => x.NaiKei);

            builder.Property(x => x.KanoKei);

            builder.Property(x => x.Present);

            builder.Property(x => x.Past);

            builder.Property(x => x.Negative);

            builder.Property(x => x.NegativePast);

            builder.HasMany(x => x.Examples)
                   .WithOne(t => t.Doushi)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Chapters)
                   .WithMany(x => x.Doushi);

            builder.HasMany(x => x.Exams)
                   .WithMany(x => x.Doushi);
        }
    }
}
