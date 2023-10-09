import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { ChapterData } from '../models/Data/ChapterData';
import { Chapter } from '../models/Entities/Chapter';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { BookService } from './book.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  public chapterURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private bookService: BookService,
    private snackbarService: SnackbarService
  ) {
    this.chapterURL = `${baseURL}/Chapters`;
  }

  public getAllChapters() {
    return this.http
      .get<ChapterData[]>(this.chapterURL)
      .pipe(map((x) => this.toChapters(x)));
  }

  public getChaptersBybookId(bookIds: string[]) {
    return this.http.post<ChapterData[]>(
      `${this.chapterURL}/by-books`,
      bookIds
    );
  }

  public toChapters(chaptersData: ChapterData[]) {
    return chaptersData.map((element) => this.toChapter(element));
  }

  public toChapter(chapterData: ChapterData) {
    const chapter: Chapter = {
      book: this.bookService.toBook(chapterData.book),
      description: chapterData.description,
      id: chapterData.id,
      name: chapterData.name,
      number: chapterData.number,
      topic: chapterData.topic,
    };

    return chapter;
  }

  public createChapter(chapter: Partial<ChapterData>) {
    return this.http
      .post<ChapterData>(`${this.chapterURL}/create`, chapter)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'The chapter was created successfully',
            'X'
          );
        }),
        map((x) => x),
        catchError((error: any) => {
          this.snackbarService.openErrorSnackbar(
            'An error occurs, the chapter was not created',
            'X'
          );
          return error;
        })
      )
      .subscribe();
  }
}
