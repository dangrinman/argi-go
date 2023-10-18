import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/models/Entities/Book';
import { Chapter } from 'src/app/models/Entities/Chapter';
import { IKotobaData } from 'src/app/models/IKotoba';
import { BookService } from 'src/app/Services/book.service';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DoushiService } from 'src/app/Services/doushi.service';
import { FukushiService } from 'src/app/Services/fukushi.service';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';
import { KotobaService } from 'src/app/Services/kotoba.service';
import { MeishiService } from 'src/app/Services/meishi.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { CardComponent } from '../card/card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CardComponent,
    ReactiveFormsModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
  ],
  selector: 'argi-guess-words',
  templateUrl: './guess-words.component.html',
  styleUrls: ['./guess-words.component.scss'],
})
export class GuessWordsComponent implements OnInit, OnDestroy {
  chapters$: Observable<Chapter[]> = this.chaptersService.getAllChapters();
  books$: Observable<Book[]> = this.booksService.getAllBooks();
  kotobaList: IKotobaData[] = [];
  currentWord!: IKotobaData;
  onDestroy$: Subject<void> = new Subject();
  word: FormGroup;
  booksSelected: boolean = false;
  chaptersSelected: boolean = false;

  @Input()
  typeWord: string = 'doushi';

  constructor(
    private fb: FormBuilder,
    private doushiService: DoushiService,
    private meishiService: MeishiService,
    private fukushiService: FukushiService,
    private keiyoushiService: KeiyoushiService,
    private snackbarService: SnackbarService,
    private chaptersService: ChapterService,
    private booksService: BookService,
    private kotobaService: KotobaService
  ) {
    this.word = this.fb.group({
      name: [''],
      chapters: ['', Validators.required],
      books: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  changeBooks(value: any) {
    this.booksSelected = value.length > 0;
    if (value.length > 0)
      this.chapters$ = this.chaptersService.getChaptersBybookId(value);
    this.word.get('chapters')?.reset();
    this.chaptersSelected = false;
  }

  changeChapters(value: string[]) {
    if (value == null) return;

    this.chaptersSelected = value.length > 0;

    switch (this.typeWord) {
      case 'keiyoushi':
        this.keiyoushiService
          .getSuffleKeiyoushiList(value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x;
            this.currentWord = this.kotobaList[0];
          });
        break;
      case 'fukushi':
        this.fukushiService
          .getSuffleFukushiList(value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x;
            this.currentWord = this.kotobaList[0];
          });
        break;
      case 'meishi':
        this.meishiService
          .getSuffleMeishiList(value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x;
            this.currentWord = this.kotobaList[0];
          });
        break;
      case 'zenbu':
        this.kotobaService
          .GetKotobaByChapters(value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x;
            this.currentWord = this.kotobaList[0];
          });
        break;
      case 'doushi':
      default:
        this.doushiService
          .getSuffleDoushiList(value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x;
            this.currentWord = this.kotobaList[0];
          });
        break;
    }
  }

  ngOnInit(): void {}

  checkTypedValue() {
    if (
      this.word.value != null &&
      (this.currentWord?.name == this.word.value.name ||
        this.currentWord?.kanji == this.word.value.name)
    ) {
      if (this.kotobaList.length == 1) {
        this.snackbarService.openSnackbar(
          `Congratulations! you finished the game`,
          'X'
        );

        this.chaptersSelected = false;
        this.booksSelected = false;
        this.word.reset();
      } else {
        this.snackbarService.openSnackbar(
          `${this.word.value.name} is correct`,
          'X'
        );

        console.log(this.kotobaList);
        console.log(this.currentWord);
        this.kotobaList = this.kotobaList.filter((x) => {
          const value1 =
            x.name == this.word.value.name && x.kanji == this.currentWord.kanji;
          const value2 = x.kanji == this.word.value.name;

          return !(value1 || value2);
        });
        this.currentWord = this.kotobaList[0];
        this.word.get('name')!.setValue('');
      }
    } else {
      this.snackbarService.openErrorSnackbar(
        `${this.currentWord?.name} is not correct, try again`,
        'X'
      );
    }
  }
}
