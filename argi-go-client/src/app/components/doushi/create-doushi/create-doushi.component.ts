import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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
import { ChapterData } from 'src/app/models/Data/ChapterData';
import { ExamData } from 'src/app/models/Data/ExamData';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DoushiService } from 'src/app/Services/doushi.service';
import { ExamService } from 'src/app/Services/exam.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

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
  ],
  providers: [SnackbarService],
  selector: 'argi-doushi-creation',
  templateUrl: './create-doushi.component.html',
  styleUrls: ['./create-doushi.component.scss'],
})
export class CreateDoushiComponent implements OnDestroy {
  chapters$: Observable<ChapterData[]> = this.chapterService.getAllChapters();
  exams$: Observable<ExamData[]> = this.examService.getAllExams();
  doushi: FormGroup;
  keywords: string[] = [];
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private announcer: LiveAnnouncer,
    private chapterService: ChapterService,
    private doushiService: DoushiService,
    private examService: ExamService,
    private snackbarService: SnackbarService
  ) {
    this.doushi = this.fb.group({
      name: ['', Validators.required],
      kanji: [''],
      group: ['', Validators.required],
      translation: ['', Validators.required],
      examples: [''],
      chapters: [''],
      exams: [''],
    });
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
      this.doushiService
        .createDoushiData(this.doushi.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe();

      this.doushi.reset();
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
  }
}
