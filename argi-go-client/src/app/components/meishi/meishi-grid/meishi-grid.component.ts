import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MeishiData } from 'src/app/models/Data/MeishiData';
import { MeishiService } from 'src/app/Services/meishi.service';

@Component({
  selector: 'app-meishi-grid',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './meishi-grid.component.html',
  styleUrls: ['./meishi-grid.component.scss'],
})
export class MeishiGridComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public dataSource = new MatTableDataSource<MeishiData>();
  onDestroy$: Subject<void> = new Subject();

  constructor(private meishiService: MeishiService) {}

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
