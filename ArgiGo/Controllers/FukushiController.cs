using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Fukushi;
using ArgiGo.Model.ModelData.Fukushi;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Fukushi")]
    public class FukushiController : ControllerBase
    {
        private readonly FukushiService fukushiService;
        public FukushiController(FukushiService fukushiService)
        {
            this.fukushiService = fukushiService;
        }

        [HttpGet()]
        public IEnumerable<FukushiData> GetAllFukushi()
        {
            var fukushiList = fukushiService.GetFukushiList().ToList();

            return fukushiService.ToFukushiData(fukushiList);
        }

        [HttpGet("by-date")]
        public IEnumerable<FukushiData> GetFukushiOrderedByDate()
        {
            var fukushiList = fukushiService.GetFukushiOrderedByDate().ToList();

            return fukushiService.ToFukushiData(fukushiList);
        }

        [HttpPost("by-chapters")]
        public IEnumerable<FukushiData> GetFukushiByChapters(IEnumerable<string> ids)
        {
            var fukushi = fukushiService.GetFukushiListByChaptersId(ids).ToList();

            return fukushiService.ToFukushiData(fukushi);
        }

        [HttpPost("create")]
        public FukushiData CreateFukushi(FukushiCreationOrUpdateData createFukushi)
        {
            var fukushi = fukushiService.CreateFukushi(createFukushi);

            return fukushiService.ToFukushiData(fukushi);
        }


        [HttpPost("update")]
        public FukushiData UpdateFukushi(FukushiCreationOrUpdateData fukushiData)
        {
            var fukushi = fukushiService.UpdateFukushi(fukushiData);

            return fukushiService.ToFukushiData(fukushi);
        }

        [HttpPost("delete")]
        public void DeleteFukushi(IEnumerable<FukushiData> fukushiList)
        {
            var fukushi = fukushiService.ToFukushiList(fukushiList);

            fukushiService.DeleteFukushiList(fukushi);
        }
    }
}