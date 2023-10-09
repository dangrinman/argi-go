using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Book;

namespace ArgiGo.Services
{
    public class BookService
    {
        private ArgiGoContext _context;

        public BookService(ArgiGoContext context)
        {
            _context = context;
        }

        public IEnumerable<BookData> GetBooksData()
        {
            var bookList = _context.Books.OrderBy(x => x.Title).ToList();

            var booksData = ToBooksData(bookList);

            return booksData;
        }

        public IQueryable<Book> GetBookDataById(string id)
        {
            var book = _context.Books.Where(x => x.Id == id);

            return book;
        }

        public Book CreateBook(BookCreationOrUpdate bookCreation)
        {
            var bookId = Guid.NewGuid().ToString();

            var book = new Book(bookId)
            {
                Title = bookCreation.Title,
                Author = bookCreation.Author,
                Description = bookCreation.Description,
                Edition = bookCreation.Edition
            };

            _context.Add(book).Context.ContextId.InstanceId.ToString();

            _context.SaveChanges();
            return book;
        }

        public Book ToBook(BookData bookData)
        {
            var book = new Book(bookData.Id)
            {
                Description = bookData.Description,
                Author = bookData.Author,
                Edition = bookData.Edition,
                Title = bookData.Title
            };

            return book;
        }

        public IEnumerable<BookData> ToBooksData(IEnumerable<Book> books)
        {
            List<BookData> bookDataList = new List<BookData>();

            foreach (var book in books)
            {
                var bookData = new BookData()
                {
                    Description = book.Description,
                    Author = book.Author,
                    Edition = book.Edition,
                    Title = book.Title,
                    Id = book.Id
                };

                bookDataList.Add(bookData);

            }

            return bookDataList;
        }

        public BookData toBookData(Book book) 
        {
            var bookData = new BookData()
            {
                Description = book.Description,
                Author = book.Author,
                Edition = book.Edition,
                Title = book.Title,
                Id = book.Id
            };

            return bookData;
        }
    }
}


