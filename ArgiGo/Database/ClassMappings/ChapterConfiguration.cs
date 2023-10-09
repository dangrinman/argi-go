using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class ChapterConfiguration : IEntityTypeConfiguration<Chapter>
    {
        public void Configure(EntityTypeBuilder<Chapter> builder)
        {
            builder.ToTable(nameof(Chapter));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name);

            builder.Property(x => x.Description);

            builder.Property(x => x.Number);

            builder.Property(x => x.Topic);
        }
    }
}
