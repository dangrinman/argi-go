import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { BookData } from 'src/app/models/Data/BookData';
import { BookService } from 'src/app/Services/book.service';
import { ChapterService } from 'src/app/Services/chapter.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'argi-create-chapter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss'],
})
export class CreateChapterComponent {
  books$: Observable<BookData[]> = this.bookService.getAllBooks();
  chapter: FormGroup;
  keywords: string[] = [];
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
      Tema: ['', Validators.required],
      Number: ['', Validators.required],
      Book: ['', Validators.required],
    });
    this.initialFormValue = this.chapter.value;
  }

  public onSubmit() {
    if (!this.chapter.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
    } else {
      this.chapterService.createChapter(this.chapter.value);
      this.formDirective.resetForm(this.initialFormValue);
    }
  }
}
