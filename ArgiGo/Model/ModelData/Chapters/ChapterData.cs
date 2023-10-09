using ArgiGo.Model.ModelData.Book;

namespace ArgiGo.Model.ModelData.Chapters
{
    public class ChapterData
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Topic { get; set; }

        public string Number { get; set; }

        public string Description { get; set; }

        public BookData Book{ get; set; }
    }
}
