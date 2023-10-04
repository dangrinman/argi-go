import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { FukushiData } from 'src/app/models/Data/FukushiData';
import { FukushiService } from 'src/app/Services/fukushi.service';

@Component({
  selector: 'app-fukushi-grid',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],

  templateUrl: './fukushi-grid.component.html',
  styleUrls: ['./fukushi-grid.component.scss'],
})
export class FukushiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<FukushiData>();
  onDestroy$: Subject<void> = new Subject();

  constructor(private fukushiService: FukushiService) {}

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
    'name',
    'kanji',
    'translation',
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
