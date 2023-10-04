import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { DoushiData } from 'src/app/models/Data/DoushiData';
import { DoushiService } from 'src/app/Services/doushi.service';

@Component({
  selector: 'app-doushi-grid',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './doushi-grid.component.html',
  styleUrls: ['./doushi-grid.component.scss'],
})
export class DoushiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<DoushiData>();
  onDestroy$: Subject<void> = new Subject();

  constructor(private doushiService: DoushiService) {}

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

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
