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
import { BookService } from 'src/app/Services/book.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'argi-create-book',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent {
  book: FormGroup;
  keywords: string[] = [];
  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  private initialFormValue!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private snackbarService: SnackbarService
  ) {
    this.book = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Author: ['', Validators.required],
      Edition: ['', Validators.required],
    });

    this.initialFormValue = this.book.value;
  }

  public onSubmit() {
    if (!this.book.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
    } else {
      this.bookService.createBook(this.book.value);
      this.formDirective.resetForm(this.initialFormValue);
    }
  }
}
