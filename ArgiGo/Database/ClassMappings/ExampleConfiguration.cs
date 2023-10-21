using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class ExampleConfiguration : IEntityTypeConfiguration<Example>
    {
        public void Configure(EntityTypeBuilder<Example> builder)
        {
            builder.ToTable(nameof(Example));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.value);

            builder.HasOne(x => x.Doushi)
                   .WithMany(x => x.Examples)
                   .IsRequired(false);

            builder.HasOne(x => x.Keiyoushi)
                   .WithMany(x => x.Examples)
                   .IsRequired(false);

            builder.HasOne(x => x.Meishi)
                   .WithMany(x => x.Examples)
                   .IsRequired(false);

            builder.HasOne(x => x.Fukushi)
                   .WithMany(x => x.Examples)
                   .IsRequired(false);
        }
    }
}
