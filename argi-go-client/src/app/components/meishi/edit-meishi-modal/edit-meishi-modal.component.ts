import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChapterData } from 'src/app/models/Data/ChapterData';
import { ExamData } from 'src/app/models/Data/ExamData';
import { MeishiData } from 'src/app/models/Data/MeishiData';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { ExamService } from 'src/app/Services/exam.service';
import { MeishiService } from 'src/app/Services/meishi.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'argi-edit-meishi-modal',
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
  templateUrl: './edit-meishi-modal.component.html',
  styleUrls: ['./edit-meishi-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMeishiModalComponent {
  chapters$: Observable<ChapterData[]> = this.chapterService.getAllChapters();
  exams$: Observable<ExamData[]> = this.examService.getAllExams();
  meishi!: FormGroup;
  keywords: string[] = [];
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private announcer: LiveAnnouncer,
    private chapterService: ChapterService,
    private meishiService: MeishiService,
    private examService: ExamService,
    private snackbarService: SnackbarService,
    private dialogService: DialogsService,
    @Inject(MAT_DIALOG_DATA) public data: MeishiData
  ) {
    this.meishi = this.fb.group({
      name: [this.data.name, Validators.required],
      kanji: [this.data.kanji],
      translation: [this.data.translation, Validators.required],
      examples: [this.data.examples],
      chapters: [this.data.chapters.map((x) => x.id)],
      exams: [this.data.exams.map((x) => x.id)],
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
      this.meishiService
        .updateMeishiData(this.data.id, this.meishi.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((x) => {
          const data = this.meishiService.ToMeishi(x);
        });
    }

    this.onClose();
  }

  public onClose() {
    this.dialogService.closeDialog();
  }

  private validateData(): boolean {
    let valid = true;
    const formData = this.meishi.value;

    if (formData.chapters.length === 0 && formData.exams.length === 0) {
      this.snackbarService.openErrorSnackbar(
        'please, set an Exam or Chapter',
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
  }
}
