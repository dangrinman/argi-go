using ArgiGo.Model.ModelData.Chapters;
using ArgiGo.Model.ModelData.Exam;
using ArgiGo.Model.ModelData.Examples;

namespace ArgiGo.Model.ModelData.Fukushi
{
    public class FukushiData
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Translation { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<ExampleData>? Examples { get; set; }

        public IEnumerable<ExamData> Exams { get; set; }

        public IEnumerable<ChapterData> Chapters { get; set; }
    }
}
