using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Example
    {
        public Example(string id)
        {
            this.Id = id;
        }

        public virtual string Id { get; set; }

        public virtual string value { get; set; }

        public virtual Doushi Doushi{ get; set;}

        public virtual Keiyoushi Keiyoushi { get; set;}

        public virtual Meishi Meishi { get; set; }

        public virtual Fukushi Fukushi { get; set; }
    }
}
