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
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
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
import { MeishiService } from 'src/app/Services/meishi.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { CreationGridComponent } from '../../kotoba/creation-grid/creation-grid.component';

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
  selector: 'app-create-meishi',
  templateUrl: './create-meishi.component.html',
  styleUrls: ['./create-meishi.component.scss'],
})
export class CreateMeishiComponent implements OnDestroy {
  chapters$: Observable<Chapter[]> = this.chapterService.getAllChapters();
  exams$: Observable<ExamData[]> = this.examService.getAllExams();
  meishi: FormGroup;
  keywords: string[] = [];
  onDestroy$: Subject<void> = new Subject();
  public refresh$ = new Subject<void>();

  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  private initialFormValue!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private meishiService: MeishiService,
    private chapterService: ChapterService,
    private examService: ExamService,
    private snackbarService: SnackbarService,
    private announcer: LiveAnnouncer
  ) {
    this.meishi = this.fb.group({
      name: ['', Validators.required],
      kanji: [''],
      chapters: [''],
      exams: [''],
      examples: [''],
      translation: ['', Validators.required],
    });

    this.initialFormValue = this.meishi.value;
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  public onSubmit() {
    let valid = this.validateData();

    if (valid) {
      this.meishiService
        .createMeishiData(this.meishi.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((x) => this.refresh$.next());

      this.formDirective.resetForm(this.initialFormValue);
      this.keywords = [];
    }
  }

  private validateData(): boolean {
    let valid = true;
    const formData = this.meishi.value;

    if (formData.chapters.length === 0 && formData.chapters.length === 0) {
      this.snackbarService.openErrorSnackbar(
        'please, set an exam or chapter',
        'x'
      );
      return !valid;
    }

    if (!this.meishi.valid) {
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
