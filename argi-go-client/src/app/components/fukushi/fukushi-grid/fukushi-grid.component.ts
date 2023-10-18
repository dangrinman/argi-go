import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Fukushi } from 'src/app/models/Entities/Fukushi';
import { DialogsService } from 'src/app/Services/dialogs.service';
import { FukushiService } from 'src/app/Services/fukushi.service';
import { EditFukushiModalComponent } from '../edit-fukushi-modal/edit-fukushi-modal.component';

@Component({
  selector: 'app-fukushi-grid',
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
  templateUrl: './fukushi-grid.component.html',
  styleUrls: ['./fukushi-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FukushiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<Fukushi>();
  onDestroy$: Subject<void> = new Subject();

  constructor(
    private fukushiService: FukushiService,
    private dialogService: DialogsService
  ) {}

  ngOnInit(): void {
    this.fukushiService
      .getAllFukushi()
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
    'naiKei',
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

  editRow(value: Fukushi) {
    const config: MatDialogConfig = {
      data: value,
      panelClass: 'modal-size',
    };
    this.dialogService
      .openDialog(EditFukushiModalComponent, config)
      .afterClosed()
      .subscribe(() => this.refreshGrid());
  }

  deleteRow(value: Fukushi) {
    this.fukushiService
      .deleteFukushi([value])
      .subscribe(() => this.refreshGrid());
  }

  refreshGrid() {
    this.fukushiService
      .getAllFukushi()
      .subscribe((x) => (this.dataSource.data = x));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
