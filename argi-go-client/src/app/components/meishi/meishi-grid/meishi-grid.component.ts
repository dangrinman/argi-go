import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Meishi } from 'src/app/models/Entities/Meishi';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { MeishiService } from 'src/app/Services/meishi.service';
import { EditMeishiModalComponent } from '../edit-meishi-modal/edit-meishi-modal.component';

@Component({
  selector: 'app-meishi-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './meishi-grid.component.html',
  styleUrls: ['./meishi-grid.component.scss'],
})
export class MeishiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<Meishi>();
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private meishiService: MeishiService,
    private dialogService: DialogsService
  ) {}

  ngOnInit(): void {
    this.meishiService
      .getAllMeishi()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((x) => {
        this.dataSource.data = x;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  displayedColumns: string[] = [
    'action',
    'name',
    'kanji',
    'translation',
    'joukenKei',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(value: Meishi) {
    const config: MatDialogConfig = {
      data: value,
      panelClass: 'modal-size',
    };
    this.dialogService
      .openDialog(EditMeishiModalComponent, config)
      .afterClosed()
      .subscribe(() => this.refreshGrid());
  }

  deleteRow(value: Meishi) {
    this.meishiService
      .deleteMeishi([value])
      .subscribe(() => this.refreshGrid());
  }

  refreshGrid() {
    this.meishiService
      .getAllMeishi()
      .subscribe((x) => (this.dataSource.data = x));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
