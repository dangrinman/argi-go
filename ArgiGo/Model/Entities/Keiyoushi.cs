using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Keiyoushi : IKotoba, IKyougaku
    {
        private readonly ICollection<Example> examples = new List<Example>();
        private readonly ICollection<Exam> exams = new List<Exam>();
        private readonly ICollection<Chapter> chapters = new List<Chapter>();

        public Keiyoushi(string id)
        {
            this.Id = id;
        }

        [Key]
        public string Id { get; set; }

        public string Translation { get; set; }

        public string KeiyoushiType {get; set;}

        public string Present { get; set; }

        public string Past { get; set; }

        public string Negative { get; set; }

        public string NegativePast { get; set; }

        public string Name { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<Example> Examples => examples;

        public IEnumerable<Exam> Exams => exams;

        public IEnumerable<Chapter> Chapters => chapters;

        public void AddExamples(IEnumerable<Example> keiyoushiExamples)
        {
            foreach (var example in keiyoushiExamples)
            {
                examples.Add(example);
            }
        }

        public void AddExams(IEnumerable<Exam> keiyoushiExamples)
        {
            foreach (var exam in keiyoushiExamples)
            {
                exams.Add(exam);
            }
        }

        public void AddChapters(IEnumerable<Chapter> keiyoushiExamples)
        {
            foreach (var chapter in keiyoushiExamples)
            {
                chapters.Add(chapter);
            }
        }
    }
}
