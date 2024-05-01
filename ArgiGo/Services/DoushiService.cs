using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Doushi;
using ArgiGo.Model.ModelData.Keiyoushi;
using ArgiGo.Model.ModelData.Meishi;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

        public IQueryable<Doushi> GetDoushi()
        {
            var doushiList = _context.Doushi.Include(x => x.Examples)
                                             .Include(x => x.Exams)
                                             .Include(x => x.Chapters)
                                             .ThenInclude(x => x.Book);

            return doushiList;
        }

        public IQueryable<Doushi> GetDoushiOrderedByDate()
        {
            var doushiList = GetDoushi().OrderByDescending(x => x.Created).Take(10);

            return doushiList;
        }

        public IQueryable<Doushi> GetDoushiList()
        {
            var doushiList = GetDoushi().OrderBy(x => x.Name);

            return doushiList;
        }

        public IQueryable<Doushi> GetDoushiByChapters(IEnumerable<string> chaptersIds)
        {
            var doushiList = GetDoushiList().Where(d => d.Chapters.Any(c => chaptersIds.Any(c2 => c.Id == c2)));

            return doushiList;
        }

        public IQueryable<Doushi> GetDoushiByIds(IEnumerable<string> ids)
        {
            var doushiList = GetDoushiList().Where(d => ids.Contains(d.Id));

            return doushiList;
        }

        public Doushi CreateDoushi(DoushiCreationOrUpdate doushiCreate) 
        {
            var doushiId = Guid.NewGuid().ToString();
            var translations = string.Join(", ", doushiCreate.Translation);

            var doushi = new Doushi(doushiId)
            {
                Group = doushiCreate.Group,
                Translation = translations,
                JishoKei = doushiCreate.JishoKei,
                Kanji = doushiCreate.Kanji,
                KanoKei = doushiCreate.KanoKei,
                NaiKei = doushiCreate.NaiKei,
                JoukenKei = doushiCreate.JoukenKei,
                Name = doushiCreate.Name,
                Negative = doushiCreate.Negative,
                NegativePast = doushiCreate.NegativePast,
                Past = doushiCreate.Past,
                Present = doushiCreate.Present,
                TaKei = doushiCreate.TaKei,
                TeKei = doushiCreate.TeKei,
                Created = DateTime.UtcNow
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

        public Doushi UpdateDoushi(DoushiCreationOrUpdate doushiUpdate)
        {
            var doushi = this.GetDoushiByIds(new List<string>() { doushiUpdate.Id! }).FirstOrDefault();

            if (doushiUpdate.Name != doushi.Name) { 
               doushi.Name = doushiUpdate.Name;
            }

            if (doushiUpdate.Kanji != doushi.Kanji)
            {
                doushi.Kanji = doushiUpdate.Kanji;
            }

            if (doushiUpdate.Translation.IsNullOrEmpty())
            {
                var translations = string.Join(", ", doushiUpdate.Translation);
                doushi.Translation = translations;
            }

            if (doushiUpdate.Group != doushi.Group)
            {
                doushi.Group = doushiUpdate.Group;
            }

            if (doushiUpdate.TeKei != doushi.TeKei)
            {
                doushi.TeKei = doushiUpdate.TeKei;
            }

            if (doushiUpdate.NaiKei != doushi.NaiKei)
            {
                doushi.NaiKei = doushiUpdate.NaiKei;
            }

            if (doushiUpdate.TaKei != doushi.TaKei)
            {
                doushi.TaKei = doushiUpdate.TaKei;
            }

            if (doushiUpdate.KanoKei != doushi.KanoKei)
            {
                doushi.KanoKei = doushiUpdate.KanoKei;
            }

            if (doushiUpdate.JoukenKei != doushi.JoukenKei)
            {
                doushi.JoukenKei = doushiUpdate.JoukenKei;
            }

            var examples = kotobaServices.UpdateExamples(doushi.Examples, doushiUpdate.Examples);
            var exams = examService.GetExamsDataByIds(doushiUpdate.Exams);
            var chapters = chapterService.GetChaptersDataByIds(doushiUpdate.Chapters);

            doushi.AddExamples(examples);
            doushi.UpdateExams(exams);
            doushi.UpdateChapters(chapters);

            _context.Update(doushi);

            _context.SaveChanges();
            return doushi;
        }

        public void DeleteDoushiList(IEnumerable<Doushi> doushiList) {
            foreach (var doushi in doushiList)
            {
                _context.Doushi.Remove(doushi);
            }

            _context.SaveChanges();
           
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
            var translations = string.Join(", ", doushiData.Translation);

            var doushi = new Doushi(doushiData.Id)
            {
                Group = doushiData.Group,
                Translation = translations,
                JishoKei = doushiData.JishoKei,
                Kanji = doushiData.Kanji,
                KanoKei = doushiData.KanoKei,
                NaiKei = doushiData.NaiKei,
                JoukenKei = doushiData.JoukenKei,
                Name = doushiData.Name,
                Negative = doushiData.Negative,
                NegativePast = doushiData.NegativePast,
                Past = doushiData.Past,
                Present = doushiData.Present,
                TaKei = doushiData.TaKei,
                TeKei = doushiData.TeKei,
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
                Group = doushi.Group,
                Exams = examService.ToExamsData(doushi.Exams),
                Chapters = chapterService.ToChaptersData(doushi.Chapters),
                Translation = doushi.Translation.Split(", "),
                Id = doushi.Id,
                JishoKei = doushi.JishoKei,
                Kanji = doushi.Kanji,
                KanoKei = doushi.KanoKei,
                JoukenKei = doushi.JoukenKei,
                NaiKei = doushi.NaiKei,
                Name = doushi.Name,
                Negative = doushi.Negative,
                NegativePast = doushi.NegativePast,
                Past = doushi.Past,
                Present = doushi.Present,
                TaKei = doushi.TaKei,
                TeKei = doushi.TeKei
            };

            return doushiData;
        }
    }
}
