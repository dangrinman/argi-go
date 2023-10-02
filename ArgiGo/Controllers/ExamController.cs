using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Exam;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Exams")]
    public class ExamController : ControllerBase
    {
        private readonly ExamService examService;
        public ExamController(ExamService examService)
        {
            this.examService = examService;
        }

        [HttpGet()]
        public IEnumerable<ExamData> GetAllExams()
        {
            var exams = examService.GetExamsData();

            return examService.ToExamsData(exams);
        }

        [HttpPost("create")]
        public Exam CreateExam(ExamCreationOrUpdate exam)
        {
            return examService.CreateExam(exam);
        }
    }
}
