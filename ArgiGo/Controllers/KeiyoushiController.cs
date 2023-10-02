﻿using ArgiGo.Model.ModelData.Fukushi;
using ArgiGo.Model.ModelData.Keiyoushi;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Keiyoushi")]
    public class KeiyoushiController : ControllerBase
    {
        private readonly KeiyoushiService keiyoushiService;
        public KeiyoushiController(KeiyoushiService keiyoushiService)
        {
            this.keiyoushiService = keiyoushiService;
        }

        [HttpGet()]
        public IEnumerable<KeiyoushiData> GetKeiyoushiList()
        {
            var keiyoushi = keiyoushiService.GetKeiyoushiList().ToList();

            return keiyoushiService.ToKeiyoushiData(keiyoushi);
        }

        [HttpPost("by-chapters")]
        public IEnumerable<KeiyoushiData> GetKeiyoushiByChapters(IEnumerable<string> ids)
        {
            var keiyoushi = keiyoushiService.GetKeiyoushiListByChaptersId(ids).ToList();

            return keiyoushiService.ToKeiyoushiData(keiyoushi);
        }

        [HttpPost("create")]
        public KeiyoushiData CreateKeiyoushi(KeiyoushiCreationOrUpdateData keiyoushiData)
        {
            var keiyoushi = keiyoushiService.createKeiyoushi(keiyoushiData);

            return keiyoushiService.ToKeiyoushiData(keiyoushi);
        }
    }
}