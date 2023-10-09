using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ArgiGo.Model.Entities
{
    public class Doushi : IKotoba, IKyougaku
    {
        private readonly ICollection<Example> examples = new List<Example>();
        private readonly ICollection<Exam> exams = new List<Exam>();
        private readonly ICollection<Chapter> chapters = new List<Chapter>();

        public Doushi(string id)
        {
            this.Id = id;
        }

        public string Id { get; set; }
        
        public string Translation { get; set; }
        
        public string Group { get; set; }

        public string? TeKei { get; set; }

        public string? TaKei { get; set; }

        public string? JishoKei { get; set; }

        public string? NaiKei { get; set; }

        public string? KanoKei { get; set; }

        public string Name { get; set; }

        public string Kanji { get; set; }

        public string? Present { get; set; }

        public string? Past { get; set; }

        public string? Negative { get; set; }

        public string? NegativePast { get; set; }

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

        public void UpdateExamples(IEnumerable<Example> doushiExamples)
        {
            examples.Clear();

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

        public void UpdateExams(IEnumerable<Exam> doushiExams)
        {
            exams.Clear();

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

        public void UpdateChapters(IEnumerable<Chapter> doushiChapters)
        {
            chapters.Clear();

            foreach (var chapter in doushiChapters)
            {
                chapters.Add(chapter);
            }
        }
    }
}
