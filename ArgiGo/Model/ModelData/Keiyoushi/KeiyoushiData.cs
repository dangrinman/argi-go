using ArgiGo.Model.ModelData.Chapters;
using ArgiGo.Model.ModelData.Exam;
using ArgiGo.Model.ModelData.Examples;

namespace ArgiGo.Model.ModelData.Keiyoushi
{
    public class KeiyoushiData : IKotobaData
    {
        public string Id { get; set; }

        public string KeiyoushiType { get; set; }

        public string Name { get; set; }

        public string Kanji { get; set; }

        public string Translation { get; set; }

        public string? Present { get; set; }

        public string? Past { get; set; }

        public string? Negative { get; set; }

        public string? NegativePast { get; set; }

        public IEnumerable<ExampleData> Examples { get; set; }

        public IEnumerable<ExamData> Exams { get; set; }

        public IEnumerable<ChapterData> Chapters { get; set; }
    }
}
