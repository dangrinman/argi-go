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
import { Chapter } from 'src/app/models/Entities/Chapter';
import { Doushi } from 'src/app/models/Entities/Doushi';
import { Exam } from 'src/app/models/Entities/Exam';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { DoushiService } from 'src/app/Services/doushi.service';
import { ExamService } from 'src/app/Services/exam.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { BaseKotobaComponent } from '../../kotoba/edit-modal/base-kotoba.component';

@Component({
  selector: 'argi-edit-doushi-modal',
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
  templateUrl: './edit-doushi-modal.component.html',
  styleUrls: ['./edit-doushi-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDoushiModalComponent extends BaseKotobaComponent {
  chapters$: Observable<Chapter[]> = this.chapterService.getAllChapters();
  exams$: Observable<Exam[]> = this.examService.getAllExams();
  doushi!: FormGroup;
  onDestroy$: Subject<void> = new Subject();

  constructor(
    announcer: LiveAnnouncer,
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private doushiService: DoushiService,
    private examService: ExamService,
    private snackbarService: SnackbarService,
    private dialogService: DialogsService,
    @Inject(MAT_DIALOG_DATA) public data: Doushi
  ) {
    super(announcer);
    this.doushi = this.fb.group({
      name: [this.data.name, Validators.required],
      kanji: [this.data.kanji],
      past: [this.data.past],
      present: [this.data.present],
      negative: [this.data.negative],
      negativePast: [this.data.negativePast],
      group: [this.data.group, Validators.required],
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
      this.doushiService
        .updateDoushiData(this.data.id, this.doushi.value)
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
