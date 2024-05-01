import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import {
  MeishiCreationOrUpdateData,
  MeishiData,
} from '../models/Data/MeishiData';
import { Meishi, UpdateMeishi } from '../models/Entities/Meishi';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { ChapterService } from './chapter.service';
import { ExamService } from './exam.service';
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
    private chaptersService: ChapterService,
    private examsService: ExamService,
    private snackbarService: SnackbarService
  ) {
    this.meishiURL = `${baseURL}/Meishi`;
  }

  public getAllMeishi() {
    return this.http
      .get<MeishiData[]>(`${this.meishiURL}`)
      .pipe(map((x) => this.toMeishiList(x)));
  }

  public getMeishiOrderedByDate() {
    return this.http
      .get<MeishiData[]>(`${this.meishiURL}/by-date`)
      .pipe(map((x) => this.toMeishiList(x)));
  }

  public createMeishi(meishi: Partial<MeishiData>) {
    return this.http.post<MeishiData>(`${this.meishiURL}/create`, meishi).pipe(
      tap(() => {
        this.snackbarService.openSnackbar(
          'The noun was inserted successfully',
          'X'
        );
      }),
      catchError((error: any) => {
        this.snackbarService.openErrorSnackbar(
          'An error occurs, the noun was not created',
          'X'
        );
        return error;
      })
    );
  }

  public updateMeishi(id: string, meishi: MeishiCreationOrUpdateData) {
    meishi.id = id;

    return this.http
      .post<MeishiCreationOrUpdateData>(`${this.meishiURL}/update`, meishi)
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

  public delete(meishiData: MeishiData[]) {
    return this.http
      .post<MeishiData>(`${this.meishiURL}/delete`, meishiData)
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

  ToMeishiData(meishi: MeishiData | MeishiCreationOrUpdateData) {
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

  public toMeishiListData(meishiList: Meishi[]) {
    return meishiList.map((x) => this.toMeishiData(x));
  }

  toMeishiData(meishi: Meishi) {
    const meishiData: MeishiData = {
      id: meishi.id,
      name: meishi.name,
      translation: meishi.translation,
      kanji: meishi.kanji,
      joukenKei: meishi.joukenKei,
      present: meishi.present,
      past: meishi.past,
      negative: meishi.negative,
      negativePast: meishi.negativePast,
      chapters: this.chaptersService.toChaptersData(meishi.chapters),
      examples: meishi.examples,
      exams: this.examsService.toExams(meishi.exams),
      created: meishi.created,
    };

    return meishiData;
  }

  toUpdateMeishiData(meishi: UpdateMeishi) {
    const meishiData: MeishiCreationOrUpdateData = {
      id: meishi.id,
      name: meishi.name,
      translation: meishi.translation,
      joukenKei: meishi.joukenKei,
      kanji: meishi.kanji,
      chapters: meishi.chapters,
      examples: meishi.examples,
      exams: meishi.exams,
      created: meishi.created,
    };

    return meishiData;
  }

  createMeishiData(meishi: MeishiData): Observable<unknown> {
    this.ToMeishiData(meishi);
    return this.createMeishi(meishi);
  }

  toMeishiList(meishiListData: MeishiData[]) {
    return meishiListData.map((x) => this.toMeishi(x));
  }

  toMeishi(meishiData: MeishiData) {
    const meishi: Meishi = {
      id: meishiData.id,
      name: meishiData.name,
      translation: meishiData.translation,
      kanji: meishiData.kanji,
      joukenKei: meishiData.joukenKei,
      present: meishiData.present,
      past: meishiData.past,
      negative: meishiData.negative,
      negativePast: meishiData.negativePast,
      chapters: this.chaptersService.toChapters(meishiData.chapters),
      examples: meishiData.examples,
      exams: this.examsService.toExams(meishiData.exams),
      created: meishiData.created,
    };

    return meishi;
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

  updateMeishiData(id: string, meishi: UpdateMeishi) {
    const meishiData = this.toUpdateMeishiData(meishi);
    this.ToMeishiData(meishiData);
    return this.updateMeishi(id, meishiData);
  }

  deleteMeishi(meishiList: Meishi[]) {
    const meishiListData = this.toMeishiListData(meishiList);
    return this.delete(meishiListData);
  }
}
