import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { KeiyoushiData } from '../models/Data/KeiyoushiData';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { KotobaService } from './kotoba.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class KeiyoushiService {
  public keiyoushiURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private kotobaService: KotobaService,
    private snackbarService: SnackbarService
  ) {
    this.keiyoushiURL = `${baseURL}/Keiyoushi`;
  }

  public getAllKeiyoushi() {
    return this.http.get<KeiyoushiData[]>(`${this.baseURL}`);
  }

  public createKeiyoushi(keiyoushi: Partial<KeiyoushiData>) {
    return this.http
      .post<KeiyoushiData>(`${this.keiyoushiURL}/create`, keiyoushi)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'The adjetive was inserted successfully',
            'X'
          );
        }),
        map((x) => x),
        catchError((error: any) => {
          this.snackbarService.openErrorSnackbar(
            'An error occurs, the adjetive was not created',
            'X'
          );
          return error;
        })
      );
  }

  setForms(keiyoushi: Partial<KeiyoushiData>) {
    const keiyoushiName = keiyoushi.name!;
    const nameWithoutDesu = keiyoushiName.slice(0, keiyoushiName.length - 2);

    if (keiyoushi.keiyoushiType == 'い') {
      keiyoushi.present = keiyoushiName;
      keiyoushi.negative = `${nameWithoutDesu}くないです`;
      keiyoushi.past = `${nameWithoutDesu}でした`;
      keiyoushi.negativePast = `${nameWithoutDesu}くないでした`;
    } else {
      keiyoushi.present = keiyoushiName;
      keiyoushi.negative = `${nameWithoutDesu}じゃありません`;
      keiyoushi.past = `${nameWithoutDesu}でした`;
      keiyoushi.negativePast = `${nameWithoutDesu}じゃありませんでした`;
    }
  }

  ToKeiyoushiData(keiyoushi: Partial<KeiyoushiData>) {
    if (keiyoushi.kanji) keiyoushi.kanji = '';
    if (!keiyoushi.chapters || keiyoushi.chapters.length === 0) {
      keiyoushi.chapters = [];
    }
    if (!keiyoushi.exams || keiyoushi.exams.length === 0) {
      keiyoushi.exams = [];
    }
    if (!keiyoushi.examples || keiyoushi.examples.length === 0) {
      keiyoushi.examples = [];
    }

    this.setForms(keiyoushi);
  }

  createKeiyoushiData(keiyoushi: Partial<KeiyoushiData>): Observable<unknown> {
    this.ToKeiyoushiData(keiyoushi);
    return this.createKeiyoushi(keiyoushi);
  }

  public GetKeiyoushiByChapters(chapters: string[]) {
    return this.http.post<KeiyoushiData[]>(
      `${this.keiyoushiURL}/by-chapters`,
      chapters
    );
  }

  public getSuffleKeiyoushiList(chapters: string[]) {
    return this.GetKeiyoushiByChapters(chapters).pipe(
      map((x) => this.kotobaService.shuffleArray([...x]))
    );
  }
}
