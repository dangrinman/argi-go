using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Meishi;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

        public IQueryable<Meishi> GetMeishi()
        {
            var meishiList = _context.Meishi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book);

            return meishiList;
        }

        public IQueryable<Meishi> GetMeishiOrderedByDate()
        {
            var meishiList = GetMeishi().OrderByDescending(x => x.Created).Take(10);

            return meishiList;
        }

        public IQueryable<Meishi> GetMeishiList()
        {
            var meishiList = GetMeishi().OrderBy(x => x.Name);

            return meishiList;
        }

        public IQueryable<Meishi> GetMeishiByChapters(IEnumerable<string> chaptersIds)
        {
            var meishiList = GetMeishiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return meishiList;
        }

        public IQueryable<Meishi> GetMeishiByIds(IEnumerable<string> ids)
        {
            var meishiList = GetMeishiList().Where(d => ids.Contains(d.Id));

            return meishiList;
        }

        public Meishi createMeishi(MeishiCreationOrUpdateData meishiData)
        {
            var id = Guid.NewGuid().ToString();

            var translations = string.Join(", ", meishiData.Translation);

            var meishi = new Meishi(id)
            {
                Name = meishiData.Name,
                Translation = translations,
                Kanji = meishiData.Kanji,
                Created = DateTime.UtcNow,
                JoukenKei = meishiData.JoukenKei,
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

        public Meishi UpdateMeishi(MeishiCreationOrUpdateData meishiUpdate)
        {
            var meishi = this.GetMeishiByIds(new List<string>() { meishiUpdate.Id! }).FirstOrDefault();

            if (meishiUpdate.Name != meishi.Name)
            {
                meishi.Name = meishiUpdate.Name;
            }

            if (meishiUpdate.Kanji != meishi.Kanji)
            {
                meishi.Kanji = meishiUpdate.Kanji;
            }

            if (meishiUpdate.JoukenKei != meishi.JoukenKei)
            {
                meishi.JoukenKei = meishiUpdate.JoukenKei;
            }

            if (meishiUpdate.Translation.IsNullOrEmpty())
            {
                var translations = string.Join(", ", meishiUpdate.Translation);

                meishi.Translation = translations;
            }

            var examples = kotobaServices.UpdateExamples(meishi.Examples, meishiUpdate.Examples);
            var exams = examService.GetExamsDataByIds(meishiUpdate.Exams);
            var chapters = chapterService.GetChaptersDataByIds(meishiUpdate.Chapters);

            meishi.AddExamples(examples);
            meishi.UpdateExams(exams);
            meishi.UpdateChapters(chapters);

            _context.Update(meishi);

            _context.SaveChanges();
            return meishi;
        }

        public void DeleteMeishiList(IEnumerable<Meishi> meishiList)
        {
            foreach (var meishi in meishiList)
            {
                _context.Meishi.Remove(meishi);
            }

            _context.SaveChanges();

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
            var translations = string.Join(", ", meishiData.Translation);

            var meishi = new Meishi(meishiData.Id)
            {
                Name = meishiData.Name,
                Translation = translations,
                Kanji = meishiData.Kanji,
                JoukenKei = meishiData.JoukenKei,
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
                Translation = meishi.Translation.Split(", "),
                JoukenKei = meishi.JoukenKei,
                Id = meishi.Id,
                Kanji = meishi.Kanji,
                Name = meishi.Name
            };

            return meishiData;
        }
    }
}

