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
    }
}