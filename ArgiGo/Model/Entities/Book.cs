using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Book
    {
        public Book(string id) { 
            this.Id = id;
        }

        [Key]
        public virtual string Id { get; set; }

        public virtual string Title { get; set; }

        public virtual string Description { get; set; }

        public virtual string Author { get; set; }

        public virtual string Edition { get; set;}
    }
}
