using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Doushi;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Doushi")]
    public class DoushiController : ControllerBase
    {
        private readonly DoushiService doushiService;
        public DoushiController(DoushiService kotobaService)
        {
            this.doushiService = kotobaService;
        }

        [HttpGet()]
        public IEnumerable<DoushiData> GetAllDoushi()
        {
            var doushi = doushiService.GetDoushiList().ToList();

            return doushiService.ToDoushiData(doushi);
        }

        [HttpGet("by-date")]
        public IEnumerable<DoushiData> GetDoushiOrderedByDate()
        {
            var doushi = doushiService.GetDoushiOrderedByDate().ToList();

            return doushiService.ToDoushiData(doushi);
        }

        [HttpPost("by-chapters")]
        public IEnumerable<DoushiData> GetDoushiByChapters(IEnumerable<string> ids)
        {
            var doushi = doushiService.GetDoushiByChapters(ids).ToList();

            return doushiService.ToDoushiData(doushi);
        }

        [HttpPost("create")]
        public DoushiData CreateDoushi(DoushiCreationOrUpdate doushiData)
        {
            var doushi = doushiService.CreateDoushi(doushiData);

            return doushiService.ToDoushiData(doushi);
        }

        [HttpPost("update")]
        public DoushiData UpdateDoushi(DoushiCreationOrUpdate doushiData)
        {
            var doushi = doushiService.UpdateDoushi(doushiData);

            return doushiService.ToDoushiData(doushi);
        }

        [HttpPost("delete")]
        public void DeleteDoushi(IEnumerable<DoushiData> doushiList)
        {
            var doushi = doushiService.ToDoushiList(doushiList);

            doushiService.DeleteDoushiList(doushi);
        }
    }
}