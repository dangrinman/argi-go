using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Book;
using ArgiGo.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArgiGo.Controllers
{
    [ApiController]
    [Route("Books")]
    public class BookController : ControllerBase
    {
        private readonly BookService bookService;
        public BookController(BookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet()]
        public IEnumerable<BookData> GetAllDoushi()
        {
            var books = bookService.GetBooks().ToList();

            var booksData = this.bookService.ToBooksData(books);

            return booksData;
        }

        [HttpGet("by-date")]
        public IEnumerable<BookData> GetDoushiListByDate()
        {
            var books = bookService.GetBooksOrderedByDate().ToList();

            var booksData = this.bookService.ToBooksData(books);

            return booksData;
        }

        [HttpPost("create")]
        public Book CreateDoushi(BookCreationOrUpdate book)
        {
            return bookService.CreateBook(book);
        }
    }
}