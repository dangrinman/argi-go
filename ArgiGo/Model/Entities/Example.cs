using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Example
    {
        public Example(string id)
        {
            this.Id = id;
        }

        [Key]
        public string Id { get; set; }

        public string value { get; set; }
    }
}
