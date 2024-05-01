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
import { Keiyoushi } from 'src/app/models/Entities/Keiyoushi';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';
import { EditKeiyoushiModalComponent } from '../edit-keiyoushi-modal/edit-keiyoushi-modal.component';

@Component({
  selector: 'app-keiyoushi-grid',
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
  templateUrl: './keiyoushi-grid.component.html',
  styleUrls: ['./keiyoushi-grid.component.scss'],
})
export class KeiyoushiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<Keiyoushi>();
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private keiyoushiService: KeiyoushiService,
    private dialogService: DialogsService
  ) {}

  ngOnInit(): void {
    this.keiyoushiService
      .getAllKeiyoushi()
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
    'keiyoushiType',
    'joukenKei',
    'present',
    'past',
    'negative',
    'negativePast',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(value: Keiyoushi) {
    const config: MatDialogConfig = {
      data: value,
      panelClass: 'modal-size',
    };
    this.dialogService
      .openDialog(EditKeiyoushiModalComponent, config)
      .afterClosed()
      .subscribe(() => this.refreshGrid());
  }

  deleteRow(value: Keiyoushi) {
    this.keiyoushiService
      .deleteKeiyoushi([value])
      .subscribe(() => this.refreshGrid());
  }

  refreshGrid() {
    this.keiyoushiService
      .getAllKeiyoushi()
      .subscribe((x) => (this.dataSource.data = x));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
