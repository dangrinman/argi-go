import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ExamData } from 'src/app/models/Data/ExamData';
import { Chapter } from 'src/app/models/Entities/Chapter';
import { ChapterService } from 'src/app/Services/chapter.service';
import { ExamService } from 'src/app/Services/exam.service';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { CreationGridComponent } from '../../kotoba/creation-grid/creation-grid.component';
import { BaseKotobaComponent } from '../../kotoba/edit-modal/base-kotoba.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    NgFor,
    CreationGridComponent,
  ],
  selector: 'app-create-keiyoushi',
  templateUrl: './create-keiyoushi.component.html',
  styleUrls: ['./create-keiyoushi.component.scss'],
})
export class CreateKeiyoushiComponent
  extends BaseKotobaComponent
  implements OnDestroy
{
  chapters$: Observable<Chapter[]> = this.chapterService.getAllChapters();
  exams$: Observable<ExamData[]> = this.examService.getAllExams();
  ktypes: string[] = ['い', 'な'];
  keiyoushi: FormGroup;
  onDestroy$: Subject<void> = new Subject();
  public refresh$ = new Subject<void>();

  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  private initialFormValue!: FormGroup;

  constructor(
    announcer: LiveAnnouncer,
    private fb: FormBuilder,
    private keiyoushiService: KeiyoushiService,
    private chapterService: ChapterService,
    private examService: ExamService,
    private snackbarService: SnackbarService
  ) {
    super(announcer);
    this.keiyoushi = this.fb.group({
      name: ['', Validators.required],
      kanji: [''],
      keiyoushiType: ['', Validators.required],
      chapters: [''],
      exams: [''],
      examples: [''],
      translation: ['', Validators.required],
    });

    this.initialFormValue = this.keiyoushi.value;
  }

  public onSubmit() {
    let valid = this.validateData();

    if (valid) {
      this.keiyoushiService
        .createKeiyoushiData(this.keiyoushi.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => this.refresh$.next());

      this.formDirective.resetForm(this.initialFormValue);
      this.keywords = [];
    }
  }

  private validateData(): boolean {
    let valid = true;
    const formData = this.keiyoushi.value;

    if (formData.chapters.length === 0 && formData.exams.length === 0) {
      this.snackbarService.openErrorSnackbar(
        'please, set an exam or chapter',
        'x'
      );
      return !valid;
    }

    if (!this.keiyoushi.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
      valid = false;
    }

    return valid;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.refresh$.next();
    this.refresh$.complete();
  }
}
