import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { MeishiData } from '../models/Data/MeishiData';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { KotobaService } from './kotoba.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class MeishiService {
  public meishiURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private kotobaService: KotobaService,
    private snackbarService: SnackbarService
  ) {
    this.meishiURL = `${baseURL}/Meishi`;
  }

  public getAllMeishi() {
    return this.http.get<MeishiData[]>(`${this.baseURL}`);
  }

  public createMeishi(meishi: Partial<MeishiData>) {
    return this.http.post<MeishiData>(`${this.meishiURL}/create`, meishi).pipe(
      tap(() => {
        this.snackbarService.openSnackbar(
          'The noun was inserted successfully',
          'X'
        );
      }),
      map((x) => x),
      catchError((error: any) => {
        this.snackbarService.openErrorSnackbar(
          'An error occurs, the noun was not created',
          'X'
        );
        return error;
      })
    );
  }

  ToMeishiData(meishi: Partial<MeishiData>) {
    if (!meishi.kanji) meishi.kanji = '';
    if (!meishi.chapters || meishi.chapters.length === 0) {
      meishi.chapters = [];
    }
    if (!meishi.exams || meishi.exams.length === 0) {
      meishi.exams = [];
    }
    if (!meishi.examples || meishi.examples.length === 0) {
      meishi.examples = [];
    }
  }

  createMeishiData(meishi: Partial<MeishiData>): Observable<unknown> {
    this.ToMeishiData(meishi);
    return this.createMeishi(meishi);
  }

  public GetMeishiByChapters(chapters: string[]) {
    return this.http.post<MeishiData[]>(
      `${this.meishiURL}/by-chapters`,
      chapters
    );
  }

  public getSuffleMeishiList(chapters: string[]) {
    return this.GetMeishiByChapters(chapters).pipe(
      map((x) => this.kotobaService.shuffleArray([...x]))
    );
  }
}
