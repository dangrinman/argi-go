using ArgiGo.Model.ModelData.Chapters;
using ArgiGo.Model.ModelData.Exam;
using ArgiGo.Model.ModelData.Examples;

namespace ArgiGo.Model.ModelData.Kotoba
{
    public class KotobaData : IKotobaData
    {
        public string Name { get; set; }

        public IEnumerable<string> Translation { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<ExamData> Exams { get; set; }

        public IEnumerable<ChapterData> Chapters { get; set; }

        public IEnumerable<ExampleData> Examples { get; set; }
    }
}
