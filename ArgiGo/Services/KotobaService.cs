using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData;
using ArgiGo.Model.ModelData.Kotoba;

namespace ArgiGo.Services
{
    public class KotobaService
    {
        private readonly FukushiService fukushiService;
        private readonly KeiyoushiService keiyoushiService;
        private readonly DoushiService doushiService;
        private readonly MeishiService meishiService;

        public KotobaService(DoushiService doushiService, KeiyoushiService KeiyoushiService, MeishiService meishiService, FukushiService fukushiService)
        {
            this.fukushiService = fukushiService;
            this.doushiService = doushiService;
            this.keiyoushiService = KeiyoushiService;
            this.meishiService = meishiService;
        }

        public IEnumerable<KotobaData> GetKotobaByChaptersId(IEnumerable<string> chaptersIds)
        {
            var kotobaDataList = new List<KotobaData>();

            // Fukushi
            var fukushiList = fukushiService.GetFukushiListByChaptersId(chaptersIds).ToList();
            var fokushiListData = fukushiService.ToFukushiData(fukushiList);
            ToKotobaDataList(kotobaDataList, fokushiListData);

            //Doushi
            var doushiList = doushiService.GetDoushiByChapters(chaptersIds).ToList();
            var doushiListData = doushiService.ToDoushiData(doushiList);
            ToKotobaDataList(kotobaDataList, doushiListData);

            //Keiyoushi
            var keiyoushiList = keiyoushiService.GetKeiyoushiListByChaptersId(chaptersIds).ToList();
            var keiyoushiListData = keiyoushiService.ToKeiyoushiData(keiyoushiList);
            ToKotobaDataList(kotobaDataList, keiyoushiListData);
            
            //meishi
            var meishiList = meishiService.GetMeishiByChapters(chaptersIds).ToList();
            var meishiListData = meishiService.ToMeishiData(meishiList);
            ToKotobaDataList(kotobaDataList, meishiListData);


            return kotobaDataList;
        }

        public void ToKotobaDataList(ICollection<KotobaData> kotobaDataList, IEnumerable<IKotobaData> kotobaList) 
        {

            foreach (var kotoba in kotobaList) 
            {
                var kotobaData = new KotobaData
                {
                    Name = kotoba.Name,
                    Translation = kotoba.Translation,
                    Kanji = kotoba.Kanji,
                    Examples = kotoba.Examples,
                    Chapters = kotoba.Chapters,
                    Exams = kotoba.Exams
                };

                kotobaDataList.Add(kotobaData);
            }
        }
    }
}
