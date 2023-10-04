import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { KeiyoushiData } from 'src/app/models/Data/KeiyoushiData';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';

@Component({
  selector: 'app-keiyoushi-grid',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './keiyoushi-grid.component.html',
  styleUrls: ['./keiyoushi-grid.component.scss'],
})
export class KeiyoushiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<KeiyoushiData>();
  onDestroy$: Subject<void> = new Subject();

  constructor(private keiyoushiService: KeiyoushiService) {}

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
    'name',
    'kanji',
    'translation',
    'keiyoushiType',
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
