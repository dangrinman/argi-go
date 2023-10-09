using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class ExamConfiguration : IEntityTypeConfiguration<Exam>
    {
        public void Configure(EntityTypeBuilder<Exam> builder)
        {
            builder.ToTable(nameof(Exam));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name);

            builder.Property(x => x.Description);

            builder.Property(x => x.Level);
        }
    }
}
