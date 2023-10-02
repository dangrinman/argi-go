namespace ArgiGo.Model.Entities
{
    public interface IKotoba
    {
        public string Name { get; set; }

        public string Translation { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<Exam> Exams { get; }

        public IEnumerable<Chapter> Chapters { get; }

        public IEnumerable<Example> Examples { get; }
    }
}
