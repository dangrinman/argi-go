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
import { ExamService } from 'src/app/Services/exam.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'argi-create-exam',
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
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent {
  exam: FormGroup;
  keywords: string[] = [];

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private snackbarService: SnackbarService
  ) {
    this.exam = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Level: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (!this.exam.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
    } else {
      this.examService.createExam(this.exam.value);
    }
  }
}
