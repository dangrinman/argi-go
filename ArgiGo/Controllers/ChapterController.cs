using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Chapters;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Chapters")]
    public class ChapterController : ControllerBase
    {
        private readonly ChapterService chapterService;
        public ChapterController(ChapterService chapterService)
        {
            this.chapterService = chapterService;
        }

        [HttpGet()]
        public IEnumerable<ChapterData> GetAllChapters()
        {
            var chapters = chapterService.GetChapters().ToList();

            return chapterService.ToChaptersData(chapters);
        }

        [HttpGet("by-date")]
        public IEnumerable<ChapterData> GetChaptersByDate()
        {
            var chapters = chapterService.GetChaptersOrderedByDate().ToList();

            return chapterService.ToChaptersData(chapters);
        }

        [HttpPost("by-books")]
        public IEnumerable<ChapterData> GetChaptersBybookIds(IEnumerable<string> bookIds)
        {
            var chapters = chapterService.GetChaptersBybookIds(bookIds).ToList();

            return chapterService.ToChaptersData(chapters);
        }

        [HttpPost("create")]
        public Chapter CreateChapter(ChapterCreationOrUpdate chapter)
        {
            return chapterService.CreateChapter(chapter);
        }
    }
}
