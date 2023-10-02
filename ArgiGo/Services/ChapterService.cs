﻿using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Book;
using ArgiGo.Model.ModelData.Chapters;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Services
{
    public class ChapterService
    {
        private readonly ArgiGoContext _context;

        private readonly BookService bookService;
        public ChapterService(BookService bookService, ArgiGoContext _context) 
        {
            this._context = _context;
            this.bookService = bookService;
        }



        public IQueryable<Chapter> GetChapters()
        {
            var chapters = _context.Chapters.Include(x => x.Book).AsQueryable();

            return chapters;
        }

        public IEnumerable<Chapter> GetChaptersBybookIds(IEnumerable<string> bookIds) 
        {
            var chapters = GetChapters().Where(x => bookIds.Contains(x.Book.Id));

            return chapters;
        }


        public IQueryable<Chapter> GetChapterDataById(string id)
        {
            var chapter = GetChapters().Where(x => x.Id == id);

            return chapter;
        }

        public IOrderedQueryable<Chapter> GetChaptersDataByIds(IEnumerable<string> ids)
        {
            var chapters = GetChapters().Where(x => ids.Contains(x.Id))
                                     .OrderBy(x => x.Name);

            return chapters;
        }

        public Chapter CreateChapter(ChapterCreationOrUpdate chapterCreateOrUpdate)
        {
            var chapterId = Guid.NewGuid().ToString();

            var chapter = new Chapter(chapterId)
            {
                Description = chapterCreateOrUpdate.Description,
                Name = chapterCreateOrUpdate.Name,
                Number = chapterCreateOrUpdate.Number,
                Tema = chapterCreateOrUpdate.Tema,
            };

            var book = bookService.GetBookDataById(chapterCreateOrUpdate.Book).FirstOrDefault();

            if (book == null) throw new Exception("Book not found");

            chapter.Book = book;

            _context.Add(chapter).Context.ContextId.InstanceId.ToString();

            _context.SaveChanges();
            return chapter;
        }

        public IEnumerable<Chapter> ToChapters(IEnumerable<ChapterData> chaptersData)
        {
            List<Chapter> chapters = new List<Chapter>();

            foreach (var chapterData in chaptersData)
            {
                var chapter = ToChapter(chapterData);

                chapters.Add(chapter);
            }

            return chapters;
        }

        public Chapter ToChapter(ChapterData chapterData)
        {
            var chapter = new Chapter(chapterData.Id)
            {
                Description = chapterData.Description,
                Name = chapterData.Name,
                Number = chapterData.Number,
                Tema = chapterData.Tema,
                Book = bookService.ToBook(chapterData.Book)
            };
            
            return chapter;
        }

        public IEnumerable<ChapterData> ToChaptersData(IEnumerable<Chapter> chaptersData)
        {
            List<ChapterData> chapterDataList = new List<ChapterData>();

            foreach (var chapter in chaptersData)
            {
               var chapterData = ToChapterData(chapter);

                chapterDataList.Add(chapterData);

            }

            return chapterDataList;
        }

        public ChapterData ToChapterData(Chapter chapter)
        {
            var chapterData = new ChapterData()
            {
                Description = chapter.Description,
                Name = chapter.Name,
                Number = chapter.Number,
                Tema = chapter.Tema,
                Id = chapter.Id,
                Book = bookService.toBookData(chapter.Book)
            };

            return chapterData;
        }
    }
}
