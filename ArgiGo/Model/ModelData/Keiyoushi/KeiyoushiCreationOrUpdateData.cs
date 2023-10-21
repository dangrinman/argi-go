namespace ArgiGo.Model.ModelData.Keiyoushi
{
    public class KeiyoushiCreationOrUpdateData
    {
        public string? Id { get; set; }

        public string? KeiyoushiType { get; set; }

        public string? Name { get; set; }

        public string? Kanji { get; set; }

        public string? Translation { get; set; }

        public string? Present { get; set; }

        public string? Past { get; set; }

        public string? Negative { get; set; }

        public string? NegativePast { get; set; }

        public IEnumerable<string>? Examples { get; set; }

        public IEnumerable<string>? Exams { get; set; }

        public IEnumerable<string>? Chapters { get; set; }
    }
}
