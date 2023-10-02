﻿using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Doushi;
using ArgiGo.Model.ModelData.Meishi;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Services
{
    public class MeishiService
    {
        private ArgiGoContext _context;
        private readonly ExampleServices kotobaServices;
        private readonly ExamService examService;
        private readonly ChapterService chapterService;

        public MeishiService(ArgiGoContext context, ExampleServices kotobaServices, ExamService examService, ChapterService chapterService)
        {
            _context = context;
            this.chapterService = chapterService;
            this.kotobaServices = kotobaServices;
            this.examService = examService;
        }

        public IQueryable<Meishi> GetMeishiList()
        {
            var meishiList = _context.Meishi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book)
                                             .AsQueryable();

            return meishiList;
        }

        public IQueryable<Meishi> GetMeishiByChapters(IEnumerable<string> chaptersIds)
        {
            var meishiList = GetMeishiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return meishiList;
        }

        public Meishi createMeishi(MeishiCreationOrUpdateData meishiData)
        {
            var id = Guid.NewGuid().ToString();

            var meishi = new Meishi(id)
            {
                Name = meishiData.Name,
                Translation = meishiData.Translation,
                Kanji = meishiData.Kanji,
            };

            var examples = kotobaServices.CreateExamples(meishiData.Examples);
            var exams = examService.GetExamsDataByIds(meishiData.Exams);
            var chapters = chapterService.GetChaptersDataByIds(meishiData.Chapters);

            meishi.AddExamples(examples);
            meishi.AddExams(exams);
            meishi.AddChapters(chapters);

            _context.Add(meishi);

            _context.SaveChanges();
            return meishi;
        }

        public IEnumerable<Meishi> ToMeishiList(IEnumerable<MeishiData> meishiListData)
        {
            List<Meishi> meishiList = new List<Meishi>();

            foreach (var meishiData in meishiListData)
            {
                var meishi = ToMeishi(meishiData);

                meishiList.Add(meishi);
            }

            return meishiList;
        }

        public Meishi ToMeishi(MeishiData meishiData)
        {
            var meishi = new Meishi(meishiData.Id)
            {
                Name = meishiData.Name,
                Translation = meishiData.Translation,
                Kanji = meishiData.Kanji,
            };

            var examples = kotobaServices.ToExamples(meishiData.Examples);
            var exams = examService.GetExamsDataByIds(meishiData.Exams.Select(x => x.Id));
            var chapters = chapterService.GetChaptersDataByIds(meishiData.Chapters.Select(x => x.Id));

            meishi.AddExamples(examples);
            meishi.AddExams(exams);
            meishi.AddChapters(chapters);

            return meishi;
        }

        public IEnumerable<MeishiData> ToMeishiData(IEnumerable<Meishi> meishiList)
        {
            List<MeishiData> meishiListData = new List<MeishiData>();

            foreach (var meishi in meishiList)
            {
                var meishiData = ToMeishiData(meishi);

                meishiListData.Add(meishiData);

            }

            return meishiListData;
        }

        public MeishiData ToMeishiData(Meishi meishi)
        {
            var meishiData = new MeishiData()
            {
                Examples = kotobaServices.toExampleData(meishi.Examples),
                Exams = examService.ToExamsData(meishi.Exams),
                Chapters = chapterService.ToChaptersData(meishi.Chapters),
                Translation = meishi.Translation,
                Id = meishi.Id,
                Kanji = meishi.Kanji,
                Name = meishi.Name
            };

            return meishiData;
        }
    }
}

