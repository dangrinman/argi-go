using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Fukushi;
using ArgiGo.Model.ModelData.Meishi;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ArgiGo.Services
{
    public class FukushiService
    {
        private ArgiGoContext _context;
        private readonly ExampleServices kotobaServices;
        private readonly ExamService examService;
        private readonly ChapterService chapterService;

        public FukushiService(ArgiGoContext context, ExampleServices kotobaServices, ExamService examService, ChapterService chapterService)
        {
            _context = context;
            this.kotobaServices = kotobaServices;
            this.examService = examService;
            this.chapterService = chapterService;
        }

        public IQueryable<Fukushi> GetFukushi()
        {
            var FukushiList = _context.Fukushi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book);

            return FukushiList;
        }

        public IQueryable<Fukushi> GetFukushiList()
        {
            var FukushiList = GetFukushi().OrderBy(x => x.Name);

            return FukushiList;
        }

        public IQueryable<Fukushi> GetFukushiOrderedByDate()
        {
            var FukushiList = GetFukushi().OrderByDescending(x => x.Created).Take(10);

            return FukushiList;
        }

        public IQueryable<Fukushi> GetFukushiListByChaptersId(IEnumerable<string> chaptersIds)
        {
            var FukushiList = GetFukushiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return FukushiList;
        }

        public IQueryable<Fukushi> GetFukushiByIds(IEnumerable<string> ids)
        {
            var fukushiList = GetFukushiList().Where(d => ids.Contains(d.Id));

            return fukushiList;
        }

        public Fukushi CreateFukushi(FukushiCreationOrUpdateData fukushiData)
        {
            var id = Guid.NewGuid().ToString();
            var translations = string.Join(", ", fukushiData.Translation);

            var fukushi = new Fukushi(id)
            {
                Name = fukushiData.Name,
                Kanji = fukushiData.Kanji,
                Translation = translations,
                Created = DateTime.UtcNow
            };

            var examples = kotobaServices.CreateExamples(fukushiData.Examples);
            var exams = examService.GetExamsDataByIds(fukushiData.Exams);
            var chapters = chapterService.GetChaptersDataByIds(fukushiData.Chapters);

            fukushi.AddExamples(examples);
            fukushi.AddExams(exams);
            fukushi.AddChapters(chapters);

            _context.Add(fukushi).Context.ContextId.InstanceId.ToString();

            _context.SaveChanges();
            return fukushi;
        }

        public Fukushi UpdateFukushi(FukushiCreationOrUpdateData fukushiUpdate)
        {
            var fukushi = this.GetFukushiByIds(new List<string>() { fukushiUpdate.Id! }).FirstOrDefault();

            if (fukushiUpdate.Name != fukushi.Name)
            {
                fukushi.Name = fukushiUpdate.Name;
            }

            if (fukushiUpdate.Kanji != fukushi.Kanji)
            {
                fukushi.Kanji = fukushiUpdate.Kanji;
            }

            if (fukushiUpdate.Translation.IsNullOrEmpty())
            {
                var translations = string.Join(", ", fukushiUpdate.Translation);
                fukushi.Translation = translations;
            }

            var examples = kotobaServices.UpdateExamples(fukushi.Examples, fukushiUpdate.Examples);
            var exams = examService.GetExamsDataByIds(fukushiUpdate.Exams);
            var chapters = chapterService.GetChaptersDataByIds(fukushiUpdate.Chapters);

            fukushi.AddExamples(examples);
            fukushi.UpdateExams(exams);
            fukushi.UpdateChapters(chapters);

            _context.Update(fukushi);

            _context.SaveChanges();
            return fukushi;
        }

        public void DeleteFukushiList(IEnumerable<Fukushi> fukushiList)
        {
            foreach (var fukushi in fukushiList)
            {
                _context.Fukushi.Remove(fukushi);
            }

            _context.SaveChanges();

        }

        public IEnumerable<Fukushi> ToFukushiList(IEnumerable<FukushiData> fukushiListData)
        {
            List<Fukushi> fukushiList = new List<Fukushi>();

            foreach (var fukushiData in fukushiListData)
            {
                var fukushi = ToFukushi(fukushiData);

                fukushiList.Add(fukushi);
            }

            return fukushiList;
        }

        public Fukushi ToFukushi(FukushiData fukushiData)
        {
            var translations = string.Join(", ", fukushiData.Translation);

            var fukushi = new Fukushi(fukushiData.Id)
            {
                Name = fukushiData.Name,
                Kanji = fukushiData.Kanji,
                Translation = translations
            };

            var examples = kotobaServices.GetExamplesById(fukushiData.Examples.Select(x => x.Id));
            var exams = examService.GetExamsDataByIds(fukushiData.Exams.Select(x => x.Id));
            var chapters = chapterService.GetChaptersDataByIds(fukushiData.Chapters.Select(x => x.Id));

            fukushi.AddExamples(examples);
            fukushi.AddExams(exams);
            fukushi.AddChapters(chapters);

            return fukushi;
        }

        public IEnumerable<FukushiData> ToFukushiData(IEnumerable<Fukushi> fukushiList)
        {
            List<FukushiData> fukushiListData = new List<FukushiData>();

            foreach (var fukushi in fukushiList)
            {
                var fukushiData = ToFukushiData(fukushi);

                fukushiListData.Add(fukushiData);

            }

            return fukushiListData;
        }

        public FukushiData ToFukushiData(Fukushi fukushi)
        {
            var fukushiData = new FukushiData()
            {
                Examples = kotobaServices.toExampleData(fukushi.Examples),
                Chapters = chapterService.ToChaptersData(fukushi.Chapters),
                Exams = examService.ToExamsData(fukushi.Exams),
                Translation = fukushi.Translation.Split(", "),
                Id = fukushi.Id,
                Kanji = fukushi.Kanji,
                Name = fukushi.Name
            };

            return fukushiData;
        }
    }
}

