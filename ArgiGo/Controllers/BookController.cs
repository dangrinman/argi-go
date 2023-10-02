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
            return bookService.GetBooksData();
        }

        [HttpPost("create")]
        public Book CreateDoushi(BookCreationOrUpdate book)
        {
            return bookService.CreateBook(book);
        }
    }
}