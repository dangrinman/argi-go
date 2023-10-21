using ArgiGo.Model.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Database.ClassMappings
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.ToTable(nameof(Book));

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title);

            builder.Property(x => x.Description);

            builder.Property(x => x.Author);

            builder.Property(x => x.Edition);

            builder.Property(x => x.Created);

            builder.HasMany(x => x.Chapters)
                   .WithOne(x => x.Book);
        }
    }
}
