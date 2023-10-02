using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Keiyoushi;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Services
{
    public class KeiyoushiService
    {
        private ArgiGoContext _context; 
        private readonly ExampleServices kotobaServices;
        private readonly ExamService examService;
        private readonly ChapterService chapterService;

        public KeiyoushiService(ArgiGoContext context, ExampleServices kotobaServices, ExamService examService, ChapterService chapterService)
        {
            _context = context;
            this.chapterService = chapterService;
            this.kotobaServices = kotobaServices;
            this.examService = examService;
        }

        public IQueryable<Keiyoushi> GetKeiyoushiList()
        {
            var keiyoushiList = _context.Keiyoushi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book)
                                             .AsQueryable();

            return keiyoushiList;
        }

        public IQueryable<Keiyoushi> GetKeiyoushiListByChaptersId(IEnumerable<string> chaptersIds)
        {
            var keiyoushiList = GetKeiyoushiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return keiyoushiList;
        }

        public Keiyoushi createKeiyoushi(KeiyoushiCreationOrUpdateData keiyoushiData)
        {
            var id = Guid.NewGuid().ToString();

            var keiyoushi = new Keiyoushi(id)
            {
                Kanji = keiyoushiData.Kanji,
                Name = keiyoushiData.Name,
                Negative = keiyoushiData.Negative,
                NegativePast = keiyoushiData.NegativePast,
                Past = keiyoushiData.Past,
                Present = keiyoushiData.Present,
                KeiyoushiType = keiyoushiData.KeiyoushiType,
                Translation = keiyoushiData.Translation,
            };

            var examples = kotobaServices.CreateExamples(keiyoushiData.Examples);
            var exams = examService.GetExamsDataByIds(keiyoushiData.Exams);
            var keiyoushiList = chapterService.GetChaptersDataByIds(keiyoushiData.Chapters);

            keiyoushi.AddExamples(examples);
            keiyoushi.AddExams(exams);
            keiyoushi.AddChapters(keiyoushiList);
            _context.Add(keiyoushi).Context.ContextId.InstanceId.ToString();

            _context.SaveChanges();
            return keiyoushi;
        }

        public IEnumerable<Keiyoushi> ToKeiyoushiList(IEnumerable<KeiyoushiData> keiyoushiData)
        {
            List<Keiyoushi> keiyoushiList = new List<Keiyoushi>();

            foreach (var KeiyoushiData in keiyoushiData)
            {
                var chapter = ToKeiyoushi(KeiyoushiData);

                keiyoushiList.Add(chapter);
            }

            return keiyoushiList;
        }

        public Keiyoushi ToKeiyoushi(KeiyoushiData keiyoushiData)
        {
            var keiyoushi = new Keiyoushi(keiyoushiData.Id)
            {
                Kanji = keiyoushiData.Kanji,
                Name = keiyoushiData.Name,
                Negative = keiyoushiData.Negative,
                NegativePast = keiyoushiData.NegativePast,
                Past = keiyoushiData.Past,
                Present = keiyoushiData.Present,
                KeiyoushiType = keiyoushiData.KeiyoushiType,
                Translation = keiyoushiData.Translation,
            };

            return keiyoushi;
        }

        public IEnumerable<KeiyoushiData> ToKeiyoushiData(IEnumerable<Keiyoushi> keiyoushiData)
        {
            List<KeiyoushiData> KeiyoushiDataList = new List<KeiyoushiData>();

            foreach (var chapter in keiyoushiData)
            {
                var KeiyoushiData = ToKeiyoushiData(chapter);

                KeiyoushiDataList.Add(KeiyoushiData);

            }

            return KeiyoushiDataList;
        }

        public KeiyoushiData ToKeiyoushiData(Keiyoushi keiyoushi)
        {
            var KeiyoushiData = new KeiyoushiData()
            {
                Examples = kotobaServices.toExampleData(keiyoushi.Examples),
                Exams = examService.ToExamsData(keiyoushi.Exams),
                Chapters = chapterService.ToChaptersData(keiyoushi.Chapters),
                KeiyoushiType = keiyoushi.KeiyoushiType,
                Translation = keiyoushi.Translation,
                Id = keiyoushi.Id,
                Kanji = keiyoushi.Kanji,
                Name = keiyoushi.Name,
                Negative = keiyoushi.Negative,
                NegativePast = keiyoushi.NegativePast,
                Past = keiyoushi.Past,
                Present = keiyoushi.Present
            };

            return KeiyoushiData;
        }
    }
}
