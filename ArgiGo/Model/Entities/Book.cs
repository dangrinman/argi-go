namespace ArgiGo.Model.Entities
{
    public class Book
    {

        private readonly ICollection<Chapter> chapters = new List<Chapter>();

        public Book(string id) { 
            this.Id = id;
        }

        public virtual string Id { get; set; }

        public virtual string Title { get; set; }

        public virtual string Description { get; set; }

        public virtual string Author { get; set; }

        public virtual string Edition { get; set;}

        public virtual DateTime Created { get; set; }

        public virtual IEnumerable<Chapter> Chapters => chapters;

        public void AddChapters(IEnumerable<Chapter> bookChapters)
        {
            foreach (var chapter in bookChapters)
            {
                AddChapter(chapter);
            }
        }

        public void AddChapter(Chapter bookChapter) {
            chapters.Add(bookChapter);
        }

        public void UpdateChapters(IEnumerable<Chapter> bookChapters)
        {
            chapters.Clear();

            foreach (var chapter in bookChapters)
            {
                chapters.Add(chapter);
            }
        }
    }
}
