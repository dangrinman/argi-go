using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Meishi : IKotoba
    {
        private readonly ICollection<Example> examples = new List<Example>();
        private readonly ICollection<Exam> exams = new List<Exam>();
        private readonly ICollection<Chapter> chapters = new List<Chapter>();

        public Meishi(string id)
        {
            this.Id = id;
        }

        [Key]
        public string Id { get; set; }

        public string Translation { get; set; }

        public string Name { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<Example> Examples => examples;

        public IEnumerable<Exam> Exams => exams;

        public IEnumerable<Chapter> Chapters => chapters;
        public void AddExamples(IEnumerable<Example> doushiExamples)
        {
            foreach (var example in doushiExamples)
            {
                examples.Add(example);
            }
        }

        public void AddExams(IEnumerable<Exam> doushiExams)
        {
            foreach (var exam in doushiExams)
            {
                exams.Add(exam);
            }
        }

        public void AddChapters(IEnumerable<Chapter> doushiChapters)
        {
            foreach (var chapter in doushiChapters)
            {
                chapters.Add(chapter);
            }
        }
    }
}
