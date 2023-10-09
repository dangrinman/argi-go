using Microsoft.EntityFrameworkCore;
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

        public string Id { get; set; }

        public string Translation { get; set; }

        public string Name { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<Example> Examples => examples;

        public IEnumerable<Exam> Exams => exams;

        public IEnumerable<Chapter> Chapters => chapters;
        public void AddExamples(IEnumerable<Example> meishiExamples)
        {
            foreach (var example in meishiExamples)
            {
                examples.Add(example);
            }
        }

        public void AddExams(IEnumerable<Exam> meishiExams)
        {
            foreach (var exam in meishiExams)
            {
                exams.Add(exam);
            }
        }

        public void AddChapters(IEnumerable<Chapter> meishiChapters)
        {
            foreach (var chapter in meishiChapters)
            {
                chapters.Add(chapter);
            }
        }

        public void UpdateExams(IEnumerable<Exam> meishiExams)
        {
            exams.Clear();

            foreach (var exam in meishiExams)
            {
                exams.Add(exam);
            }
        }

        public void UpdateChapters(IEnumerable<Chapter> meishiChapters)
        {
            chapters.Clear();

            foreach (var chapter in meishiChapters)
            {
                chapters.Add(chapter);
            }
        }
    }
}
