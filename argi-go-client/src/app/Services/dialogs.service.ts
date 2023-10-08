import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(public dialog: MatDialog) {}

  public openDialog(
    componentType: ComponentType<unknown>,
    data: MatDialogConfig
  ) {
    return this.dialog.open(componentType, data);
  }

  public closeDialog() {
    this.dialog.closeAll();
  }
}
