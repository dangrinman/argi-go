import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IBaseData } from 'src/app/models/IKotoba';
import { BookService } from 'src/app/Services/book.service';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DoushiService } from 'src/app/Services/doushi.service';
import { ExamService } from 'src/app/Services/exam.service';
import { FukushiService } from 'src/app/Services/fukushi.service';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';
import { MeishiService } from 'src/app/Services/meishi.service';

@Component({
  selector: 'argi-creation-grid',
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
  templateUrl: './creation-grid.component.html',
  styleUrls: ['./creation-grid.component.scss'],
})
export class CreationGridComponent implements OnInit, OnChanges {
  @ViewChild(MatTable) table!: MatTable<IBaseData>;
  public dataSource = new MatTableDataSource<IBaseData>();
  onDestroy$: Subject<void> = new Subject();

  @Input()
  public kotobaType!: string;

  @Input()
  public refreshTable!: Observable<void>;

  constructor(
    private doushiService: DoushiService,
    private meishiService: MeishiService,
    private fukushiService: FukushiService,
    private keiyoushiService: KeiyoushiService,
    private examService: ExamService,
    private chaptersService: ChapterService,
    private booksService: BookService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTable']) {
      this.refreshTable.subscribe(() => {
        this.GetData();
      });
    }
  }

  ngOnInit(): void {
    this.GetData();
  }

  private setDataSource(data: IBaseData[]) {
    this.dataSource.data = data;
  }

  displayedColumns: string[] = ['name'];

  private GetData() {
    switch (this.kotobaType) {
      case 'book':
        this.booksService
          .getBooksOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
      case 'keiyoushi':
        this.keiyoushiService
          .getKeiyoushiOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
      case 'fukushi':
        this.fukushiService
          .getFukushiOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
      case 'meishi':
        this.meishiService
          .getMeishiOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
      case 'chapter':
        this.chaptersService
          .getChaptersOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
      case 'exam':
        this.examService
          .getExamsOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
      case 'doushi':
      default:
        this.doushiService
          .getDoushiOrderedByDate()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.setDataSource(x);
          });
        break;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
