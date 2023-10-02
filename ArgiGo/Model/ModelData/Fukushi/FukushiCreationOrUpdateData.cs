namespace ArgiGo.Model.ModelData.Fukushi
{
    public class FukushiCreationOrUpdateData
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string? Kanji { get; set; }

        public string? Translation { get; set; }

        public IEnumerable<string>? Examples { get; set; }

        public IEnumerable<string>? Exams { get; set; }

        public IEnumerable<string>? Chapters { get; set; }
    }
}
