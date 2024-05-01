import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  Subject,
  takeUntil,
  toArray,
} from 'rxjs';
import { Book } from 'src/app/models/Entities/Book';
import { Chapter } from 'src/app/models/Entities/Chapter';
import { IKeiKotoba } from 'src/app/models/IKotoba';
import { BookService } from 'src/app/Services/book.service';
import { ChapterService } from 'src/app/Services/chapter.service';
import { DoushiService } from 'src/app/Services/doushi.service';
import { FukushiService } from 'src/app/Services/fukushi.service';
import { KeiyoushiService } from 'src/app/Services/keiyoushi.service';
import { KotobaService } from 'src/app/Services/kotoba.service';
import { MeishiService } from 'src/app/Services/meishi.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { KeiCardComponent } from '../kei-card/kei-card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    KeiCardComponent,
  ],
  selector: 'argi-guess-kei',
  templateUrl: './guess-kei.component.html',
  styleUrls: ['./guess-kei.component.scss'],
})
export class GuessKeiComponent implements OnInit, OnDestroy {
  chapters$: Observable<Chapter[]> = this.chaptersService.getAllChapters();
  books$: Observable<Book[]> = this.booksService.getAllBooks();
  kotobaList: IKeiKotoba[] = [];
  currentWord!: IKeiKotoba;
  onDestroy$: Subject<void> = new Subject();
  word: FormGroup;
  conjugationSelected: boolean = false;
  currentKei: string = '';

  @Input()
  typeWord: string = 'doushi';

  public conjugations: string[] = [
    'て形',
    '辞書形',
    'ない形',
    'た形',
    '可能形',
    '条件形',
  ];

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
      kei: [''],
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  changeKei(value: string) {
    if (value == null) return;

    switch (value) {
      case 'て形':
        this.doushiService
          .suffleDoushiList()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x.map((x) => {
              var word: IKeiKotoba = {
                word: x.kanji,
                keiWork: x.teKei,
              };
              return word;
            });
            this.currentWord = this.kotobaList[0];
          });
        break;
      case '辞書形':
        this.doushiService
          .suffleDoushiList()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x.map((x) => {
              var word: IKeiKotoba = {
                word: x.kanji,
                keiWork: x.jishoKei,
              };
              return word;
            });
            this.currentWord = this.kotobaList[0];
          });
        break;
      case 'ない形':
        this.doushiService
          .suffleDoushiList()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x.map((x) => {
              var word: IKeiKotoba = {
                word: x.kanji,
                keiWork: x.naiKei,
              };
              return word;
            });
            this.currentWord = this.kotobaList[0];
          });
        break;
      case 'た形':
        this.doushiService
          .suffleDoushiList()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x.map((x) => {
              var word: IKeiKotoba = {
                word: x.kanji,
                keiWork: x.taKei,
              };
              return word;
            });
            this.currentWord = this.kotobaList[0];
          });
        break;
      case '可能形':
        this.doushiService
          .suffleDoushiList()
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((x) => {
            this.kotobaList = x.map((x) => {
              var word: IKeiKotoba = {
                word: x.kanji,
                keiWork: x.kanoKei,
              };
              return word;
            });
            this.currentWord = this.kotobaList[0];
          });
        break;
      case '条件形':
      default:
        this.getJoukenKeiKotoba();
        break;
    }
    this.conjugationSelected = true;
  }

  ngOnInit(): void {}

  getJoukenKeiKotoba() {
    let kotoba: string[] = [];
    const doushiList = this.doushiService.getAllDoushi().pipe(
      takeUntil(this.onDestroy$),
      map((x) =>
        x.map((x) => {
          var word: IKeiKotoba = {
            word: x.kanji,
            keiWork: x.joukenKei,
          };
          return word;
        })
      )
    );

    const keiyoushiList = this.keiyoushiService.getAllKeiyoushi().pipe(
      takeUntil(this.onDestroy$),
      map((x) =>
        x.map((x) => {
          var word: IKeiKotoba = {
            word: x.kanji,
            keiWork: x.joukenKei,
          };
          return word;
        })
      )
    );

    const meishiList = this.meishiService.getAllMeishi().pipe(
      takeUntil(this.onDestroy$),
      map((x) =>
        x.map((x) => {
          var word: IKeiKotoba = {
            word: x.kanji,
            keiWork: x.joukenKei,
          };
          return word;
        })
      )
    );

    forkJoin([doushiList, keiyoushiList, meishiList])
      .pipe(
        mergeMap(([doushiList, keiyoushiList, meishiList]) => {
          // Utilizamos mergeMap para procesar cada lista de objetos en paralelo
          return from(doushiList.concat(keiyoushiList, meishiList)).pipe(
            // Utilizamos toArray para convertir los valores en un único array
            toArray()
          );
        })
      )
      .subscribe((x) => {
        this.kotobaList = x;
        this.currentWord = this.kotobaList[0];
      });
  }

  checkTypedValue() {
    if (
      this.word.value != null &&
      this.currentWord.keiWork == this.word.value.name
    ) {
      if (this.kotobaList.length == 1) {
        this.snackbarService.openSnackbar(
          `Congratulations! you finished the game`,
          'X'
        );

        this.conjugationSelected = false;
        this.word.reset();
      } else {
        this.snackbarService.openSnackbar(
          `${this.word.value.name} is correct`,
          'X'
        );

        this.kotobaList = this.kotobaList.filter((x) => {
          const value1 = x.keiWork == this.word.value.name;

          return !value1;
        });
        this.currentWord = this.kotobaList[0];
        this.word.get('name')!.setValue('');
      }
    } else {
      this.snackbarService.openErrorSnackbar(
        `${this.currentWord.word} is not correct, try again`,
        'X'
      );
    }
  }
}
