using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Doushi;
using ArgiGo.Model.ModelData.Fukushi;
using Microsoft.EntityFrameworkCore;

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

        public IQueryable<Fukushi> GetFukushiList()
        {
            var FukushiList = _context.Fukushi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book)
                                             .AsQueryable();

            return FukushiList;
        }

        public IQueryable<Fukushi> GetFukushiListByChaptersId(IEnumerable<string> chaptersIds)
        {
            var FukushiList = GetFukushiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return FukushiList;
        }

        public Fukushi CreateFukushi(FukushiCreationOrUpdateData fukushiData)
        {
            var id = Guid.NewGuid().ToString();

            var fukushi = new Fukushi(id)
            {
                Name = fukushiData.Name,
                Kanji = fukushiData.Kanji,
                Translation = fukushiData.Translation,
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

        public IEnumerable<Fukushi> ToFukushiList(IEnumerable<FukushiData> doushiListData)
        {
            List<Fukushi> fukushiData = new List<Fukushi>();

            foreach (var doushiData in doushiListData)
            {
                var doushi = ToFukushi(doushiData);

                fukushiData.Add(doushi);
            }

            return fukushiData;
        }

        public Fukushi ToFukushi(FukushiData fukushiData)
        {
            var fukushi = new Fukushi(fukushiData.Id)
            {
                Name = fukushiData.Name,
                Kanji = fukushiData.Kanji,
                Translation = fukushiData.Translation
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
            var doushiData = new FukushiData()
            {
                Examples = kotobaServices.toExampleData(fukushi.Examples),
                Chapters = chapterService.ToChaptersData(fukushi.Chapters),
                Exams = examService.ToExamsData(fukushi.Exams),
                Translation = fukushi.Translation,
                Id = fukushi.Id,
                Kanji = fukushi.Kanji,
                Name = fukushi.Name
            };

            return doushiData;
        }
    }
}

