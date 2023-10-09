using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Meishi;
using ArgiGo.Model.ModelData.Meishi;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Meishi")]
    public class MeishiController : ControllerBase
    {
        private readonly MeishiService meishiService;
        public MeishiController(MeishiService meishiService)
        {
            this.meishiService = meishiService;
        }

        [HttpGet()]
        public IEnumerable<MeishiData> GetAll()
        {
            var meishi = meishiService.GetMeishiList().ToList();

            return meishiService.ToMeishiData(meishi);
        }

        [HttpPost("by-chapters")]
        public IEnumerable<MeishiData> GetFukushiByChapters(IEnumerable<string> ids)
        {
            var meishi = meishiService.GetMeishiByChapters(ids).ToList();

            return meishiService.ToMeishiData(meishi);
        }

        [HttpPost("create")]
        public MeishiData CreateMeishi(MeishiCreationOrUpdateData meishiData)
        {
            var meishi = meishiService.createMeishi(meishiData);

            return meishiService.ToMeishiData(meishi);
        }

        [HttpPost("update")]
        public MeishiData UpdateMeishi(MeishiCreationOrUpdateData meishiData)
        {
            var meishi = meishiService.UpdateMeishi(meishiData);

            return meishiService.ToMeishiData(meishi);
        }

        [HttpPost("delete")]
        public void DeleteMeishi(IEnumerable<MeishiData> meishiList)
        {
            var meishi = meishiService.ToMeishiList(meishiList);

            meishiService.DeleteMeishiList(meishi);
        }
    }
}