import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { ExamData } from '../models/Data/ExamData';
import { Exam } from '../models/Entities/Exam';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  public examURL: string;
  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.examURL = `${baseURL}/Exams`;
  }

  public getAllExams() {
    return this.http.get<ExamData[]>(this.examURL);
  }

  public toExams(examsData: ExamData[]) {
    return examsData.map((element) => this.toExam(element));
  }

  public toExam(examData: ExamData) {
    const exam: Exam = {
      description: examData.description,
      id: examData.id,
      name: examData.name,
      level: examData.level,
    };

    return exam;
  }

  public createExam(exam: Partial<ExamData>) {
    return this.http
      .post<ExamData>(`${this.examURL}/create`, exam)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'The exam was created successfully',
            'X'
          );
        }),
        map((x) => x),
        catchError((error: any) => {
          this.snackbarService.openErrorSnackbar(
            'An error occurs, the exam was not created',
            'X'
          );
          return error;
        })
      )
      .subscribe();
  }
}
