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
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ExamData } from 'src/app/models/Data/ExamData';
import { Chapter } from 'src/app/models/Entities/Chapter';
import { Keiyoushi } from 'src/app/models/Entities/Keiyoushi';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { ExamService } from 'src/app/Services/exam.service';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { BaseKotobaComponent } from '../../kotoba/edit-modal/base-kotoba.component';

@Component({
  selector: 'argi-edit-keiyoushi-modal',
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
  templateUrl: './edit-keiyoushi-modal.component.html',
  styleUrls: ['./edit-keiyoushi-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditKeiyoushiModalComponent extends BaseKotobaComponent {
  chapters$: Observable<Chapter[]> = this.chapterService.getAllChapters();
  exams$: Observable<ExamData[]> = this.examService.getAllExams();
  keiyoushi!: FormGroup;
  onDestroy$: Subject<void> = new Subject();

  constructor(
    announcer: LiveAnnouncer,
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private keiyoushiService: KeiyoushiService,
    private examService: ExamService,
    private snackbarService: SnackbarService,
    private dialogService: DialogsService,
    @Inject(MAT_DIALOG_DATA) public data: Keiyoushi
  ) {
    super(announcer);
    this.keiyoushi = this.fb.group({
      name: [this.data.name, Validators.required],
      kanji: [this.data.kanji],
      keiyoushiType: [this.data.keiyoushiType],
      translation: [this.data.translation, Validators.required],
      examples: [this.data.examples.map((x) => x.example)],
      chapters: [this.data.chapters.map((x) => x.id)],
      exams: [this.data.exams.map((x) => x.id)],
    });

    this.keywords = this.data.examples.map((x) => x.example);
    this.translations = this.data.translation;
  }

  public onSubmit() {
    let valid = this.validateData();

    if (valid) {
      this.keiyoushiService
        .updateKeiyoushiData(this.data.id, this.keiyoushi.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe();
    }

    this.onClose();
  }

  public onClose() {
    this.dialogService.closeDialog();
  }

  private validateData(): boolean {
    let valid = true;
    const formData = this.keiyoushi.value;

    if (formData.chapters.length === 0 && formData.exams.length === 0) {
      this.snackbarService.openErrorSnackbar(
        'please, set an Exam or Chapter',
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
  }
}
