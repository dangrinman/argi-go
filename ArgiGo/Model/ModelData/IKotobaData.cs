using ArgiGo.Model.ModelData.Chapters;
using ArgiGo.Model.ModelData.Exam;
using ArgiGo.Model.ModelData.Examples;

namespace ArgiGo.Model.ModelData
{
    public interface IKotobaData
    {
        public string Name { get; set; }

        public IEnumerable<string> Translation { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<ExamData> Exams { get; }

        public IEnumerable<ChapterData> Chapters { get; }

        public IEnumerable<ExampleData> Examples { get; }
    }
}
