using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Chapter
    {
        private readonly ICollection<Doushi> doushiList = new List<Doushi>();
        private readonly ICollection<Keiyoushi> keiyoushiList = new List<Keiyoushi>();
        private readonly ICollection<Meishi> meishiList = new List<Meishi>();
        private readonly ICollection<Fukushi> fukushiList = new List<Fukushi>();

        public Chapter(string id)
        {
            this.Id = id;
        }

        [Key]
        public string Id { get; set; }

        public virtual string Name { get; set; }

        public virtual string Topic { get; set; }

        public virtual string Number { get; set; }

        public virtual string Description { get; set; }

        public virtual Book Book { get; set; }
        public virtual DateTime Created { get; set; }

        public virtual ICollection<Doushi> Doushi => doushiList;

        public virtual ICollection<Keiyoushi> Keiyoushi => keiyoushiList;

        public virtual ICollection<Meishi> Meishi => meishiList;

        public virtual ICollection<Fukushi> Fukushi => fukushiList;



    }
}
