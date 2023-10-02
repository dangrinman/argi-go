import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
      panelClass: 'success-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public openErrorSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
