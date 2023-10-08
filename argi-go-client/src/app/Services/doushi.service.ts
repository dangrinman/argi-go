import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { DoushiData } from '../models/Data/DoushiData';
import { Doushi } from '../models/Entities/Doushi';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { KotobaService } from './kotoba.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class DoushiService {
  public doushiURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private kotobaService: KotobaService,
    private snackbarService: SnackbarService
  ) {
    this.doushiURL = `${baseURL}/Doushi`;
  }

  public getAllDoushi() {
    return this.http.get<DoushiData[]>(`${this.doushiURL}`);
  }

  public GetDoushiByChapters(chapters: string[]) {
    return this.http.post<DoushiData[]>(
      `${this.doushiURL}/by-chapters`,
      chapters
    );
  }

  public getSuffleDoushiList(chapters: string[]) {
    return this.GetDoushiByChapters(chapters).pipe(
      map((x) => this.kotobaService.shuffleArray([...x]))
    );
  }

  public createDoushi(doushi: Partial<DoushiData>) {
    return this.http.post<DoushiData>(`${this.doushiURL}/create`, doushi).pipe(
      tap(() => {
        this.snackbarService.openSnackbar(
          'The verb was inserted successfully',
          'X'
        );
      }),
      catchError((error: any) => {
        this.snackbarService.openErrorSnackbar(
          'An error occurs, the verb was not created',
          'X'
        );
        return error;
      })
    );
  }

  public updateDoushi(id: string, doushi: Partial<DoushiData>) {
    doushi.id = id;

    return this.http.post<DoushiData>(`${this.doushiURL}/update`, doushi).pipe(
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

  public delete(doushiData: DoushiData[]) {
    return this.http
      .post<DoushiData>(`${this.doushiURL}/delete`, doushiData)
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

  ToDoushi(doushiData: DoushiData) {
    const doushi: Doushi = {
      id: doushiData.id,
      name: doushiData.name,
      translation: doushiData.translation,
      group: doushiData.group,
      kanji: doushiData.kanji,
      jishoKei: doushiData.jishoKei,
      teKei: doushiData.teKei,
      taKei: doushiData.taKei,
      naiKei: doushiData.naiKei,
      kanoKei: doushiData.kanoKei,
      present: doushiData.present,
      past: doushiData.past,
      negative: doushiData.negative,
      negativePast: doushiData.negativePast,
      chapters: doushiData.chapters,
      examples: doushiData.examples,
      exams: doushiData.exams,
    };

    return doushi;
  }

  setConjugationData(
    doushi: Partial<DoushiData>,
    doushiName: string,
    group: number
  ) {
    doushi.jishoKei = this.kotobaService.ToJishoForm(doushiName, group);
    doushi.kanoKei = this.kotobaService.ToKanoForm(doushiName, group);
    doushi.teKei = this.kotobaService.ToTeForm(doushiName, group);
    doushi.taKei = this.kotobaService.ToTaForm(doushiName, group);
    doushi.naiKei = this.kotobaService.ToNaiForm(doushiName, group);
  }

  setForms(doushi: Partial<DoushiData>, doushiName: string) {
    const nameWithoutMasu = doushiName.slice(0, doushiName.length - 2);

    doushi.present = doushiName;
    doushi.negative = `${nameWithoutMasu}ません`;
    doushi.past = `${nameWithoutMasu}ました`;
    doushi.negativePast = `${nameWithoutMasu}ませんでした`;
  }

  ToDoushiData(doushi: Partial<DoushiData>) {
    if (!doushi.kanji) doushi.kanji = '';
    if (!doushi.chapters || doushi.chapters.length === 0) {
      doushi.chapters = [];
    }
    if (!doushi.exams || doushi.exams.length === 0) {
      doushi.exams = [];
    }
    if (!doushi.examples || doushi.examples.length === 0) {
      doushi.examples = [];
    }

    this.setConjugationData(doushi, doushi.name!, doushi.group!);
    this.setForms(doushi, doushi.name!);
  }

  createDoushiData(doushi: Partial<DoushiData>): Observable<unknown> {
    this.ToDoushiData(doushi);
    return this.createDoushi(doushi);
  }

  updateDoushiData(
    id: string,
    doushi: Partial<DoushiData>
  ): Observable<DoushiData> {
    this.ToDoushiData(doushi);
    return this.updateDoushi(id, doushi) as Observable<DoushiData>;
  }

  deleteDoushi(doushiList: DoushiData[]) {
    return this.delete(doushiList);
  }
}
