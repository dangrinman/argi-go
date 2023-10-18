import { CommonModule } from '@angular/common';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { Book } from 'src/app/models/Entities/Book';
import { BookService } from 'src/app/Services/book.service';
import { ChapterService } from 'src/app/Services/chapter.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { CreationGridComponent } from '../../kotoba/creation-grid/creation-grid.component';

@Component({
  selector: 'argi-create-chapter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CreationGridComponent,
  ],
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss'],
})
export class CreateChapterComponent implements OnDestroy {
  books$: Observable<Book[]> = this.bookService.getAllBooks();
  chapter: FormGroup;
  keywords: string[] = [];
  public refresh$ = new Subject<void>();
  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  private initialFormValue!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private bookService: BookService,
    private snackbarService: SnackbarService
  ) {
    this.chapter = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      topic: ['', Validators.required],
      Number: ['', Validators.required],
      Book: ['', Validators.required],
    });
    this.initialFormValue = this.chapter.value;
  }

  ngOnDestroy(): void {
    this.refresh$.next();
    this.refresh$.complete();
  }

  public onSubmit() {
    if (!this.chapter.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
    } else {
      this.chapterService
        .createChapter(this.chapter.value)
        .subscribe(() => this.refresh$.next());
      this.formDirective.resetForm(this.initialFormValue);
    }
  }
}
