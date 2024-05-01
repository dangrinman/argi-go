import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import {
  KeiyoushiCreationOrUpdateData,
  KeiyoushiData,
} from '../models/Data/KeiyoushiData';
import { Keiyoushi, UpdateKeiyoushi } from '../models/Entities/Keiyoushi';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { ChapterService } from './chapter.service';
import { ExamService } from './exam.service';
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
    private chaptersService: ChapterService,
    private examsService: ExamService,
    private snackbarService: SnackbarService
  ) {
    this.keiyoushiURL = `${baseURL}/Keiyoushi`;
  }

  public getAllKeiyoushi() {
    return this.http
      .get<KeiyoushiData[]>(`${this.keiyoushiURL}`)
      .pipe(map((x) => this.toKeiyoushiList(x)));
  }

  public getKeiyoushiOrderedByDate() {
    return this.http
      .get<KeiyoushiData[]>(`${this.keiyoushiURL}/by-date`)
      .pipe(map((x) => this.toKeiyoushiList(x)));
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

  public updateKeiyoushi(id: string, keiyoushi: KeiyoushiCreationOrUpdateData) {
    keiyoushi.id = id;

    return this.http
      .post<KeiyoushiCreationOrUpdateData>(
        `${this.keiyoushiURL}/update`,
        keiyoushi
      )
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'The verb was updated successfully',
            'X'
          );
        }),
        catchError((error: any) => {
          this.snackbarService.openErrorSnackbar(
            'An error occurs, the verb was not updated',
            'X'
          );
          return error;
        })
      );
  }

  toKeiyoushi(keiyoushiData: KeiyoushiData) {
    const keiyoushi: Keiyoushi = {
      id: keiyoushiData.id,
      name: keiyoushiData.name,
      translation: keiyoushiData.translation,
      kanji: keiyoushiData.kanji,
      keiyoushiType: keiyoushiData.keiyoushiType,
      joukenKei: keiyoushiData.joukenKei,
      present: keiyoushiData.present,
      past: keiyoushiData.past,
      negative: keiyoushiData.negative,
      negativePast: keiyoushiData.negativePast,
      chapters: this.chaptersService.toChapters(keiyoushiData.chapters),
      examples: keiyoushiData.examples,
      exams: this.examsService.toExams(keiyoushiData.exams),
      created: keiyoushiData.created,
    };

    return keiyoushi;
  }

  toKeiyoushiList(keiyoushiData: KeiyoushiData[]) {
    return keiyoushiData.map((x) => this.toKeiyoushi(x));
  }

  toKeiyoushiData(keiyoush: Keiyoushi) {
    const keiyoushiData: KeiyoushiData = {
      id: keiyoush.id,
      name: keiyoush.name,
      translation: keiyoush.translation,
      kanji: keiyoush.kanji,
      keiyoushiType: keiyoush.keiyoushiType,
      joukenKei: keiyoush.joukenKei,
      present: keiyoush.present,
      past: keiyoush.past,
      negative: keiyoush.negative,
      negativePast: keiyoush.negativePast,
      chapters: this.chaptersService.toChaptersData(keiyoush.chapters),
      examples: keiyoush.examples,
      exams: this.examsService.toExamsData(keiyoush.exams),
      created: keiyoush.created,
    };

    return keiyoushiData;
  }

  toUpdateKeiyoushiData(keiyoushi: UpdateKeiyoushi) {
    const keiyoushiData: KeiyoushiCreationOrUpdateData = {
      id: keiyoushi.id,
      name: keiyoushi.name,
      translation: keiyoushi.translation,
      kanji: keiyoushi.kanji,
      keiyoushiType: keiyoushi.keiyoushiType,
      joukenKei: keiyoushi.joukenKei,
      present: keiyoushi.present,
      past: keiyoushi.past,
      negative: keiyoushi.negative,
      negativePast: keiyoushi.negativePast,
      chapters: keiyoushi.chapters,
      examples: keiyoushi.examples,
      exams: keiyoushi.exams,
      created: keiyoushi.created,
    };

    return keiyoushiData;
  }

  toKeiyoushiListData(keiyoushi: Keiyoushi[]) {
    return keiyoushi.map((x) => this.toKeiyoushiData(x));
  }

  public delete(keiyoushiData: KeiyoushiData[]) {
    return this.http
      .post<KeiyoushiData>(`${this.keiyoushiURL}/delete`, keiyoushiData)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'The verb was deleted successfully',
            'X'
          );
        }),
        catchError((error: any) => {
          this.snackbarService.openErrorSnackbar(
            'An error occurs, the verb was not deleted',
            'X'
          );
          return error;
        })
      );
  }

  setForms(keiyoushi: KeiyoushiData | KeiyoushiCreationOrUpdateData) {
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

  ToKeiyoushiData(keiyoushi: KeiyoushiData | KeiyoushiCreationOrUpdateData) {
    if (!keiyoushi.kanji) keiyoushi.kanji = '';
    if (!keiyoushi.chapters || keiyoushi.chapters.length === 0) {
      keiyoushi.chapters = [];
    }
    if (!keiyoushi.exams || keiyoushi.exams.length === 0) {
      keiyoushi.exams = [];
    }
    if (!keiyoushi.examples || keiyoushi.examples.length === 0) {
      keiyoushi.examples = [];
    }

    keiyoushi.joukenKei = this.kotobaService.TojoukenFormByKeiyoushi(
      keiyoushi.name,
      keiyoushi.keiyoushiType
    );
    this.setForms(keiyoushi);
  }

  createKeiyoushiData(keiyoushi: KeiyoushiData): Observable<unknown> {
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

  updateKeiyoushiData(id: string, keiyoushi: UpdateKeiyoushi) {
    const keiyoushiData = this.toUpdateKeiyoushiData(keiyoushi);
    this.ToKeiyoushiData(keiyoushiData);
    return this.updateKeiyoushi(id, keiyoushiData) as Observable<KeiyoushiData>;
  }

  deleteKeiyoushi(keiyoushiList: Keiyoushi[]) {
    const keiyoushiListData = this.toKeiyoushiListData(keiyoushiList);
    return this.delete(keiyoushiListData);
  }
}
