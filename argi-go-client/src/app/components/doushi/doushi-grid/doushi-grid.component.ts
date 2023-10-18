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
import { Doushi } from 'src/app/models/Entities/Doushi';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { DoushiService } from 'src/app/Services/doushi.service';
import { EditDoushiModalComponent } from '../edit-doushi-modal/edit-doushi-modal.component';

@Component({
  selector: 'app-doushi-grid',
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
  templateUrl: './doushi-grid.component.html',
  styleUrls: ['./doushi-grid.component.scss'],
})
export class DoushiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<Doushi>();
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private doushiService: DoushiService,
    private dialogService: DialogsService
  ) {}

  ngOnInit(): void {
    this.doushiService
      .getAllDoushi()
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
    'group',
    'teKei',
    'taKei',
    'jishoKei',
    'naKei',
    'kanoKei',
    'present',
    'past',
    'negative',
    'negativePast',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(value: Doushi) {
    const config: MatDialogConfig = {
      data: value,
      panelClass: 'modal-size',
    };
    this.dialogService
      .openDialog(EditDoushiModalComponent, config)
      .afterClosed()
      .subscribe(() => this.refreshGrid());
  }

  deleteRow(value: Doushi) {
    this.doushiService
      .deleteDoushi([value])
      .subscribe(() => this.refreshGrid());
  }

  refreshGrid() {
    this.doushiService
      .getAllDoushi()
      .subscribe((x) => (this.dataSource.data = x));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
