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
import { DoushiService } from 'src/app/Services/doushi.service';
import { ExamService } from 'src/app/Services/exam.service';
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
    MatSelectModule,
    FormsModule,
    NgFor,
    CreationGridComponent,
  ],
  providers: [SnackbarService],
  selector: 'argi-doushi-creation',
  templateUrl: './create-doushi.component.html',
  styleUrls: ['./create-doushi.component.scss'],
})
export class CreateDoushiComponent
  extends BaseKotobaComponent
  implements OnDestroy
{
  chapters$: Observable<Chapter[]> = this.chapterService.getAllChapters();
  exams$: Observable<ExamData[]> = this.examService.getAllExams();
  doushi: FormGroup;
  doushiGroup: string[] = ['1', '2', '3'];
  onDestroy$: Subject<void> = new Subject();
  public refresh = new Subject<void>();
  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  private initialFormValue!: FormGroup;

  constructor(
    announcer: LiveAnnouncer,
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private doushiService: DoushiService,
    private examService: ExamService,
    private snackbarService: SnackbarService
  ) {
    super(announcer);
    this.doushi = this.fb.group({
      name: ['', Validators.required],
      kanji: [''],
      group: ['', Validators.required],
      translation: ['', Validators.required],
      examples: [[]],
      chapters: [[]],
      exams: [[]],
    });

    this.initialFormValue = this.doushi.value;
  }

  public onSubmit() {
    let valid = this.validateData();

    if (valid) {
      this.doushiService
        .createDoushiData(this.doushi.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => this.refresh.next());

      this.formDirective.resetForm(this.initialFormValue);
      this.keywords = [];
    }
  }

  private validateData(): boolean {
    let valid = true;
    const formData = this.doushi.value;

    if (formData.chapters.length === 0 && formData.exams.length === 0) {
      this.snackbarService.openErrorSnackbar(
        'please, set an Exam or Chapter',
        'x'
      );
      return !valid;
    }

    if (!this.doushi.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
      valid = false;
    }

    return valid;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.refresh.next();
    this.refresh.complete();
  }
}
