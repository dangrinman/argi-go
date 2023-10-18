import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { FukushiData } from '../models/Data/FukushiData';
import { Fukushi } from '../models/Entities/Fukushi';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { ChapterService } from './chapter.service';
import { ExamService } from './exam.service';
import { KotobaService } from './kotoba.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class FukushiService {
  public fukushiURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private kotobaService: KotobaService,
    private chaptersService: ChapterService,
    private examsService: ExamService,
    private snackbarService: SnackbarService
  ) {
    this.fukushiURL = `${baseURL}/Fukushi`;
  }

  public getAllFukushi() {
    return this.http
      .get<FukushiData[]>(`${this.fukushiURL}`)
      .pipe(map((x) => this.toFukushiList(x)));
  }

  public getFukushiOrderedByDate() {
    return this.http
      .get<FukushiData[]>(`${this.fukushiURL}/by-date`)
      .pipe(map((x) => this.toFukushiList(x)));
  }

  public createFukushi(fukushi: Partial<FukushiData>) {
    return this.http
      .post<FukushiData>(`${this.fukushiURL}/create`, fukushi)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'The adverb was inserted successfully',
            'X'
          );
        }),
        map((x) => x),
        catchError((error: any) => {
          this.snackbarService.openErrorSnackbar(
            'An error occurs, the adverb was not created',
            'X'
          );
          return error;
        })
      );
  }

  public updateFukushi(id: string, fukushi: Partial<FukushiData>) {
    fukushi.id = id;

    return this.http
      .post<FukushiData>(`${this.fukushiURL}/update`, fukushi)
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

  public delete(fukushiData: FukushiData[]) {
    return this.http
      .post<FukushiData>(`${this.fukushiURL}/delete`, fukushiData)
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

  public toFukushiList(fukushiListData: FukushiData[]) {
    return fukushiListData.map((x) => this.toFukushi(x));
  }

  toFukushi(fukushiData: FukushiData) {
    const fukushi: Fukushi = {
      id: fukushiData.id,
      name: fukushiData.name,
      translation: fukushiData.translation,
      kanji: fukushiData.kanji,
      chapters: this.chaptersService.toChapters(fukushiData.chapters),
      examples: fukushiData.examples,
      exams: this.examsService.toExams(fukushiData.exams),
      created: fukushiData.created,
    };

    return fukushi;
  }

  public toFukushiListData(fukushiList: Fukushi[]) {
    return fukushiList.map((x) => this.toFukushiData(x));
  }

  toFukushiData(fukushi: Fukushi) {
    const fukushiData: FukushiData = {
      id: fukushi.id,
      name: fukushi.name,
      translation: fukushi.translation,
      kanji: fukushi.kanji,
      chapters: this.chaptersService.toChaptersData(fukushi.chapters),
      examples: fukushi.examples,
      exams: this.examsService.toExamsData(fukushi.exams),
      created: fukushi.created,
    };

    return fukushiData;
  }

  ToFukushiData(fukushi: Partial<FukushiData>) {
    if (!fukushi.chapters || fukushi.chapters.length === 0) {
      fukushi.chapters = [];
    }
    if (!fukushi.exams || fukushi.exams.length === 0) {
      fukushi.exams = [];
    }
    if (!fukushi.examples || fukushi.examples.length === 0) {
      fukushi.examples = [];
    }
  }

  createFukushiData(fukushi: Partial<FukushiData>): Observable<unknown> {
    this.ToFukushiData(fukushi);
    return this.createFukushi(fukushi);
  }

  public GetFukushiByChapters(chapters: string[]) {
    return this.http.post<FukushiData[]>(
      `${this.fukushiURL}/by-chapters`,
      chapters
    );
  }

  public getSuffleFukushiList(chapters: string[]) {
    return this.GetFukushiByChapters(chapters).pipe(
      map((x) => this.kotobaService.shuffleArray([...x]))
    );
  }

  updateFukushiData(
    id: string,
    fukushi: Partial<FukushiData>
  ): Observable<FukushiData> {
    this.ToFukushiData(fukushi);
    return this.updateFukushi(id, fukushi) as Observable<FukushiData>;
  }

  deleteFukushi(fukushiList: Fukushi[]) {
    const fukushiListData = this.toFukushiListData(fukushiList);
    return this.delete(fukushiListData);
  }
}
