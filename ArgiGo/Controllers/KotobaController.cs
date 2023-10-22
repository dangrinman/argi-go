using ArgiGo.Model.ModelData.Kotoba;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Kotoba")]
    public class KotobaController : ControllerBase
    {
        private readonly KotobaService kotobaService;
       
        public KotobaController(KotobaService kotobaService)
        {
            this.kotobaService = kotobaService;
        }

        [HttpPost("by-chapters")]
        public IEnumerable<KotobaData> GetKotobaByChapters(IEnumerable<string> ids)
        {
            var kotobaList = kotobaService.GetKotobaByChaptersId(ids);

            return kotobaList;
        }
    }
}