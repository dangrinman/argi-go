using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Fukushi;
using ArgiGo.Model.ModelData.Keiyoushi;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

        public IQueryable<Keiyoushi> GetKeiyoushi()
        {
            var keiyoushiList = _context.Keiyoushi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book);

            return keiyoushiList;
        }

        public IQueryable<Keiyoushi> GetKeiyoushiList()
        {
            var keiyoushiList = GetKeiyoushi().OrderBy(x => x.Name);

            return keiyoushiList;
        }

        public IQueryable<Keiyoushi> GetKeiyoushiOrderedByDate()
        {
            var keiyoushiList = GetKeiyoushiList().OrderByDescending(x => x.Created).Take(10);

            return keiyoushiList;
        }

        public IQueryable<Keiyoushi> GetKeiyoushiListByChaptersId(IEnumerable<string> chaptersIds)
        {
            var KeiyoushiList = GetKeiyoushiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return KeiyoushiList;
        }

        public IQueryable<Keiyoushi> GetKeiyoushiByIds(IEnumerable<string> ids)
        {
            var keiyoushiList = GetKeiyoushiList().Where(d => ids.Contains(d.Id));

            return keiyoushiList;
        }

        public Keiyoushi createKeiyoushi(KeiyoushiCreationOrUpdateData keiyoushiData)
        {
            var id = Guid.NewGuid().ToString();
            var translations = string.Join(", ", keiyoushiData.Translation);

            var keiyoushi = new Keiyoushi(id)
            {
                Kanji = keiyoushiData.Kanji,
                Name = keiyoushiData.Name,
                Negative = keiyoushiData.Negative,
                NegativePast = keiyoushiData.NegativePast,
                JoukenKei = keiyoushiData.JoukenKei,
                Past = keiyoushiData.Past,
                Present = keiyoushiData.Present,
                KeiyoushiType = keiyoushiData.KeiyoushiType,
                Translation = translations,
                Created = DateTime.UtcNow
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

        public Keiyoushi UpdateKeiyoushi(KeiyoushiCreationOrUpdateData keiyoushiUpdate)
        {
            var keiyoushi = this.GetKeiyoushiByIds(new List<string>() { keiyoushiUpdate.Id! }).FirstOrDefault();

            if (keiyoushiUpdate.Name != keiyoushi.Name)
            {
                keiyoushi.Name = keiyoushiUpdate.Name;
            }

            if (keiyoushiUpdate.Kanji != keiyoushi.Kanji)
            {
                keiyoushi.Kanji = keiyoushiUpdate.Kanji;
            }

            if (!keiyoushiUpdate.Translation.IsNullOrEmpty())
            {
                var translations = string.Join(", ", keiyoushiUpdate.Translation);
                keiyoushi.Translation = translations;
            }

            if (keiyoushiUpdate.JoukenKei != keiyoushi.JoukenKei)
            {
                keiyoushi.JoukenKei = keiyoushiUpdate.JoukenKei;
            }

            var examples = kotobaServices.UpdateExamples(keiyoushi.Examples, keiyoushiUpdate.Examples);
            var exams = examService.GetExamsDataByIds(keiyoushiUpdate.Exams);
            var chapters = chapterService.GetChaptersDataByIds(keiyoushiUpdate.Chapters);

            keiyoushi.AddExamples(examples);
            keiyoushi.UpdateExams(exams);
            keiyoushi.UpdateChapters(chapters);

            _context.Update(keiyoushi);

            _context.SaveChanges();
            return keiyoushi;
        }

        public void DeleteKeiyoushiList(IEnumerable<Keiyoushi> keiyoushiList)
        {
            foreach (var keiyoushi in keiyoushiList)
            {
                _context.Keiyoushi.Remove(keiyoushi);
            }

            _context.SaveChanges();

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
            var translations = string.Join(", ", keiyoushiData.Translation);

            var keiyoushi = new Keiyoushi(keiyoushiData.Id)
            {
                Kanji = keiyoushiData.Kanji,
                Name = keiyoushiData.Name,
                Negative = keiyoushiData.Negative,
                NegativePast = keiyoushiData.NegativePast,
                JoukenKei = keiyoushiData.JoukenKei,
                Past = keiyoushiData.Past,
                Present = keiyoushiData.Present,
                KeiyoushiType = keiyoushiData.KeiyoushiType,
                Translation = translations,
            };

            var examples = kotobaServices.GetExamplesById(keiyoushiData.Examples.Select(x => x.Id));
            var exams = examService.GetExamsDataByIds(keiyoushiData.Exams.Select(x => x.Id));
            var chapters = chapterService.GetChaptersDataByIds(keiyoushiData.Chapters.Select(x => x.Id));

            keiyoushi.AddExamples(examples);
            keiyoushi.AddExams(exams);
            keiyoushi.AddChapters(chapters);

            return keiyoushi;
        }

        public IEnumerable<KeiyoushiData> ToKeiyoushiListData(IEnumerable<Keiyoushi> keiyoushiData)
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
                Translation = keiyoushi.Translation.Split(", "),
                JoukenKei = keiyoushi.JoukenKei,
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
