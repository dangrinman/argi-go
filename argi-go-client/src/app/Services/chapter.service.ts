import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { ChapterData } from '../models/Data/ChapterData';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  public chapterURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.chapterURL = `${baseURL}/Chapters`;
  }

  public getAllChapters() {
    return this.http.get<ChapterData[]>(this.chapterURL);
  }

  public getChaptersBybookId(bookIds: string[]) {
    return this.http.post<ChapterData[]>(
      `${this.chapterURL}/by-books`,
      bookIds
    );
  }

  public toChapters(chaptersData: ChapterData[]) {}

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
