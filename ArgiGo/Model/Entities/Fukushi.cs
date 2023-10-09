using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Fukushi : IKotoba
    {
        private readonly ICollection<Example> examples = new List<Example>();
        private readonly ICollection<Exam> exams = new List<Exam>();
        private readonly ICollection<Chapter> chapters = new List<Chapter>();

        public Fukushi(string id)
        {
            this.Id = id;
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Translation { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<Example> Examples => examples;

        public IEnumerable<Exam> Exams => exams;

        public IEnumerable<Chapter> Chapters => chapters;

        public void AddExamples(IEnumerable<Example> fukushiExamples)
        {
            foreach (var example in fukushiExamples)
            {
                examples.Add(example);
            }
        }

        public void AddExams(IEnumerable<Exam> fukushiExams)
        {
            foreach (var exam in fukushiExams)
            {
                exams.Add(exam);
            }
        }

        public void AddChapters(IEnumerable<Chapter> fukushiChapters)
        {
            foreach (var chapter in fukushiChapters)
            {
                chapters.Add(chapter);
            }
        }

        public void UpdateExams(IEnumerable<Exam> fukushiExams)
        {
            exams.Clear();

            foreach (var exam in fukushiExams)
            {
                exams.Add(exam);
            }
        }

        public void UpdateChapters(IEnumerable<Chapter> fukushiChapters)
        {
            chapters.Clear();

            foreach (var chapter in fukushiChapters)
            {
                chapters.Add(chapter);
            }
        }
    }
}
