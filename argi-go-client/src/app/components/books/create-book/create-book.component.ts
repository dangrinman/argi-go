import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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
  }

  public onSubmit() {
    if (!this.book.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
    } else {
      this.bookService.createBook(this.book.value);
      this.book.reset();
    }
  }
}
