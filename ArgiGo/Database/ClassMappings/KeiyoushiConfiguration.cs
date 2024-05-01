using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class KeiyoushiConfiguration : IEntityTypeConfiguration<Keiyoushi>
    {
        public void Configure(EntityTypeBuilder<Keiyoushi> builder)
        {
            builder.ToTable(nameof(Keiyoushi));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name);

            builder.Property(x => x.Kanji);

            builder.Property(x => x.Translation);

            builder.Property(x => x.KeiyoushiType);

            builder.Property(x => x.JoukenKei);

            builder.Property(x => x.Present);

            builder.Property(x => x.Past);

            builder.Property(x => x.Negative);

            builder.Property(x => x.NegativePast);

            builder.Property(x => x.Created);

            builder.HasMany(x => x.Examples)
                   .WithOne(t => t.Keiyoushi)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Chapters)
                   .WithMany(x => x.Keiyoushi);

            builder.HasMany(x => x.Exams)
                   .WithMany(x => x.Keiyoushi);
        }
    }
}