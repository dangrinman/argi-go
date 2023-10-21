using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Exam;

namespace ArgiGo.Services
{
    public class ExamService
    {
        private ArgiGoContext _context;

        public ExamService(ArgiGoContext context)
        {
            _context = context;
        }

        public IQueryable<Exam> GetExams()
        {
            return _context.Exams;
        }

        public IQueryable<Exam> GetExamsList()
        {
            return GetExams().OrderBy(x => x.Name);
        }

        public IQueryable<Exam> GetExamsOrderedByDate()
        {
            var examList = _context.Exams.OrderByDescending(x => x.Created).Take(10);

            return examList;
        }

        public IQueryable<Exam> GetExamsDataById(string id)
        {
            var exam = _context.Exams.Where(x => x.Id == id);

            return exam;
        }

        public IOrderedQueryable<Exam> GetExamsDataByIds(IEnumerable<string> ids)
        {
            var exams = _context.Exams.Where(x => ids.Contains(x.Id))
                                     .OrderBy(x => x.Name);

            return exams;
        }

        public Exam CreateExam(ExamCreationOrUpdate examCreation)
        {
            var examId = Guid.NewGuid().ToString();

            var exam = new Exam(examId)
            {
                Name = examCreation.Name,
                Level = examCreation.Level,
                Description = examCreation.Description,
                Created = DateTime.UtcNow
            };

            _context.Add(exam).Context.ContextId.InstanceId.ToString();

            _context.SaveChanges();
            return exam;
        }

        public IEnumerable<Exam> ToExams(IEnumerable<ExamData> examsData)
        {
            List<Exam> exams = new List<Exam>();

            foreach (var examData in examsData)
            {
                var exam = ToExam(examData);
                exams.Add(exam);
            }

            return exams;
        }

        public Exam ToExam(ExamData examsData)
        {
            var exam = new Exam(examsData.Id)
            {
                Name = examsData.Name,
                Level = examsData.Level,
                Description = examsData.Description,
            };

            return exam;
        }

        public IEnumerable<ExamData> ToExamsData(IEnumerable<Exam> exams)
        {
            List<ExamData> examDataList = new List<ExamData>();

            foreach (var exam in exams)
            {
                var examData = ToExamData(exam);

                examDataList.Add(examData);

            }

            return examDataList;
        }

        public ExamData ToExamData(Exam exam)
        {
            var examData = new ExamData()
            {
                Name = exam.Name,
                Level = exam.Level,
                Description = exam.Description,
                Id = exam.Id
            };

            return examData;
        }

        public IEnumerable<Exam> UpdateExams(IEnumerable<Exam> exams, IEnumerable<string> examsIds)
        {
            if (exams.Count() > 0)
            {
                _context.RemoveRange(exams);
            }

            List<Exam> examsToBeCreated = new List<Exam>();

            var examsList = GetExamsDataByIds(examsIds);

            foreach (var exam in examsList)
            {
                examsToBeCreated.Add(exam);
            }

            _context.SaveChanges();

            return examsToBeCreated;
        }
    }
}


