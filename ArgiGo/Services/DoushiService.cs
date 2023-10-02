﻿using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Doushi;
using ArgiGo.Model.ModelData.Keiyoushi;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Services
{
    public class DoushiService
    {
        private readonly ArgiGoContext _context;
        private readonly ExampleServices kotobaServices;
        private readonly ExamService examService;
        private readonly ChapterService chapterService;

        public DoushiService(ArgiGoContext context, ExampleServices kotobaServices, ExamService examService, ChapterService chapterService)
        {
            _context = context;
            this.kotobaServices = kotobaServices;
            this.examService = examService;
            this.chapterService = chapterService;
        }

        public IQueryable<Doushi> GetDoushiList()
        {
            var doushiList = _context.Doushi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book)
                                             .AsQueryable();

            return doushiList;
        }

        public IQueryable<Doushi> GetDoushiByChapters(IEnumerable<string> chaptersIds)
        {
            var doushiList = GetDoushiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return doushiList;
        }

        public Doushi CreateDoushi(DoushiCreationOrUpdate doushiCreate) 
        {
            var doushiId = Guid.NewGuid().ToString();

            var doushi = new Doushi(doushiId)
            {
                Group = doushiCreate.Group,
                Translation = doushiCreate.Translation,
                JishoKei = doushiCreate.JishoKei,
                Kanji = doushiCreate.Kanji,
                KanoKei = doushiCreate.KanoKei,
                NaiKei = doushiCreate.NaiKei,
                Name = doushiCreate.Name,
                Negative = doushiCreate.Negative,
                NegativePast = doushiCreate.NegativePast,
                Past = doushiCreate.Past,
                Present = doushiCreate.Present,
                TaKei = doushiCreate.TaKei,
                TeKei = doushiCreate.TeKei,
            };

            var examples = kotobaServices.CreateExamples(doushiCreate.Examples);
            var exams = examService.GetExamsDataByIds(doushiCreate.Exams);
            var chapters = chapterService.GetChaptersDataByIds(doushiCreate.Chapters);

            doushi.AddExamples(examples);
            doushi.AddExams(exams);
            doushi.AddChapters(chapters);

            _context.Add(doushi).Context.ContextId.InstanceId.ToString();

            _context.SaveChanges();
            return doushi;
        }

        public IEnumerable<Doushi> ToDoushiList(IEnumerable<DoushiData> doushiListData)
        {
            List<Doushi> doushiList = new List<Doushi>();

            foreach (var doushiData in doushiListData)
            {
                var doushi = ToDoushi(doushiData);

                doushiList.Add(doushi);
            }

            return doushiList;
        }

        public Doushi ToDoushi(DoushiData doushiData)
        {
            var doushi = new Doushi(doushiData.Id)
            {
                Group = doushiData.Group,
                Translation = doushiData.Translation,
                JishoKei = doushiData.JishoKei,
                Kanji = doushiData.Kanji,
                KanoKei = doushiData.KanoKei,
                NaiKei = doushiData.NaKei,
                Name = doushiData.Name,
                Negative = doushiData.Negative,
                NegativePast = doushiData.NegativePast,
                Past = doushiData.Past,
                Present = doushiData.Present,
                TaKei = doushiData.TaKei,
                TeKei = doushiData.TKei,
            };

            return doushi;
        }

        public IEnumerable<DoushiData> ToDoushiData(IEnumerable<Doushi> doushiList)
        {
            List<DoushiData> doushiListData = new List<DoushiData>();

            foreach (var doushi in doushiList)
            {
                var doushiData = ToDoushiData(doushi);

                doushiListData.Add(doushiData);

            }

            return doushiListData;
        }

        public DoushiData ToDoushiData(Doushi doushi)
        {
            var doushiData = new DoushiData()
            {
                Examples = kotobaServices.toExampleData(doushi.Examples),
                Exams = examService.ToExamsData(doushi.Exams),
                Chapters = chapterService.ToChaptersData(doushi.Chapters),
                Translation = doushi.Translation,
                Id = doushi.Id,
                JishoKei = doushi.JishoKei,
                Kanji = doushi.Kanji,
                KanoKei = doushi.KanoKei,
                NaKei = doushi.NaiKei,
                Name = doushi.Name,
                Negative = doushi.Negative,
                NegativePast = doushi.NegativePast,
                Past = doushi.Past,
                Present = doushi.Present,
                TaKei = doushi.TaKei,
                TKei = doushi.TeKei
            };

            return doushiData;
        }
    }
}
