﻿using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Chapters;
using ArgiGo.Model.ModelData.Exam;
using ArgiGo.Model.ModelData.Examples;

namespace ArgiGo.Model.ModelData.Doushi
{
    public class DoushiData: IKotobaData
    {
        public string Id { get; set; }

        public string Group { get; set; }

        public string? TeKei { get; set; }

        public string? TaKei { get; set; }

        public string? JishoKei { get; set; }

        public string? NaiKei { get; set; }

        public string? KanoKei { get; set; }

        public string? JoukenKei { get; set; }

        public string Name { get; set; }

        public string Kanji { get; set; }

        public IEnumerable<string> Translation { get; set; }

        public string? Present { get; set; }

        public string? Past { get; set; }

        public string? Negative { get; set; }

        public string? NegativePast { get; set; }

        public IEnumerable<ExampleData>? Examples { get; set; }

        public IEnumerable<ExamData> Exams { get; set; }

        public IEnumerable<ChapterData> Chapters { get; set; }
    }
}
