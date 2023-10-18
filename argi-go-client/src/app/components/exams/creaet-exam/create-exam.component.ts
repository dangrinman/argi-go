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
import { Subject } from 'rxjs';
import { ExamService } from 'src/app/Services/exam.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { CreationGridComponent } from '../../kotoba/creation-grid/creation-grid.component';

@Component({
  selector: 'argi-create-exam',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    CreationGridComponent,
  ],
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent implements OnDestroy {
  exam: FormGroup;
  keywords: string[] = [];
  public refresh = new Subject<void>();

  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  private initialFormValue!: FormGroup;

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
    this.initialFormValue = this.exam.value;
  }

  public onSubmit() {
    if (!this.exam.valid) {
      this.snackbarService.openErrorSnackbar('check the forms', 'x');
    } else {
      this.examService
        .createExam(this.exam.value)
        .subscribe(() => this.refresh.next());
      this.formDirective.resetForm(this.initialFormValue);
    }
  }

  ngOnDestroy(): void {
    this.refresh.next();
    this.refresh.complete();
  }
}
