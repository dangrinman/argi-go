import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { BookData } from '../models/Data/BookData';
import { Book } from '../models/Entities/Book';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public bookURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.bookURL = `${baseURL}/Books`;
  }

  public getAllBooks() {
    return this.http
      .get<BookData[]>(this.bookURL)
      .pipe(map((x) => this.toBooks(x)));
  }

  public getBooksOrderedByDate() {
    return this.http
      .get<BookData[]>(`${this.bookURL}/by-date`)
      .pipe(map((x) => this.toBooks(x)));
  }

  public toBooks(booksData: BookData[]) {
    return booksData.map((x) => this.toBook(x));
  }

  public toBook(bookData: BookData) {
    const book: Book = {
      author: bookData.author,
      description: bookData.description,
      edition: bookData.edition,
      id: bookData.id,
      name: bookData.title,
      created: bookData.created,
    };

    return book;
  }

  public toBookData(book: Book) {
    const bookData: BookData = {
      author: book.author,
      description: book.description,
      edition: book.edition,
      id: book.id,
      title: book.name,
      created: book.created,
    };

    return bookData;
  }

  public createBook(book: Partial<BookData>) {
    return this.http.post<BookData>(`${this.bookURL}/create`, book).pipe(
      tap(() => {
        this.snackbarService.openSnackbar(
          'The Book was created successfully',
          'X'
        );
      }),
      map((x) => x),
      catchError((error: any) => {
        this.snackbarService.openErrorSnackbar(
          'An error occurs, the verb was not created',
          'X'
        );
        return error;
      })
    );
  }
}
