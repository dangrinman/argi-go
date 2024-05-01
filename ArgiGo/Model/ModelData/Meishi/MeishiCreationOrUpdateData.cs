﻿namespace ArgiGo.Model.ModelData.Meishi
{
    public class MeishiCreationOrUpdateData
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string? Kanji { get; set; }

        public IEnumerable<string> Translation { get; set; }

        public string? JoukenKei { get; set; }

        public IEnumerable<string>? Examples { get; set; }

        public IEnumerable<string>? Exams { get; set; }

        public IEnumerable<string>? Chapters { get; set; }
    }
}
