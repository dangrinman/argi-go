import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IKotoba, IKotobaData } from '../models/IKotoba';
import { BaseURLToken } from '../models/Tokens/BaseURLToken';
import { ChapterService } from './chapter.service';
import { ExamService } from './exam.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class KotobaService {
  private teDictionary = new Map<string, string>();
  private jishoDictionary = new Map<string, string>();
  private taDictionary = new Map<string, string>();
  private naiDictionary = new Map<string, string>();
  private kanoDictionary = new Map<string, string>();
  private joukenDictionary = new Map<string, string>();
  public kotobaURL: string;

  constructor(
    @Inject(BaseURLToken) private readonly baseURL: string,
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private chaptersService: ChapterService,
    private examsService: ExamService
  ) {
    this.kotobaURL = `${baseURL}/Kotoba`;
    this.initializeDictionaries();
  }

  public GetKotobaByChapters(chapters: string[]) {
    return this.http.post<IKotobaData[]>(
      `${this.kotobaURL}/by-chapters`,
      chapters
    );
  }

  public getSuffleFukushiList(chapters: string[]) {
    return this.GetKotobaByChapters(chapters).pipe(
      map((x) => this.shuffleArray([...x]))
    );
  }

  public ToTeForm(name: string, group: string): string {
    if (name == 'いきます') {
      return `い${this.getWord('いきます', '0', this.teDictionary)}`;
    }
    const wordWithOutMasu =
      group != '2'
        ? name.slice(0, name.length - 3)
        : name.slice(0, name.length - 2);

    const teWord = this.getWord(name, group, this.teDictionary);

    if (!teWord) {
      return '';
    }

    return `${wordWithOutMasu}${teWord}`;
  }

  public ToTaForm(name: string, group: string): string {
    if (name == 'いきます') {
      return `い${this.getWord('いきます', '0', this.taDictionary)}`;
    }

    const wordWithOutMasu =
      group != '2'
        ? name.slice(0, name.length - 3)
        : name.slice(0, name.length - 2);

    const taWord = this.getWord(name, group, this.taDictionary);

    if (!taWord) {
      return '';
    }

    return `${wordWithOutMasu}${taWord}`;
  }

  public ToJishoForm(name: string, group: string): string {
    const wordWithOutMasu =
      group != '2'
        ? name.slice(0, name.length - 3)
        : name.slice(0, name.length - 2);

    const jishoWord = this.getWord(name, group, this.jishoDictionary);

    if (!jishoWord) {
      return '';
    }

    return `${wordWithOutMasu}${jishoWord}`;
  }

  public ToNaiForm(name: string, group: string): string {
    const wordWithOutMasu =
      group != '2'
        ? name.slice(0, name.length - 3)
        : name.slice(0, name.length - 2);

    const naiWord = this.getWord(name, group, this.naiDictionary);

    if (!naiWord) {
      return '';
    }

    return `${wordWithOutMasu}${naiWord}`;
  }

  public ToKanoForm(name: string, group: string): string {
    const wordWithOutMasu =
      group != '2'
        ? name.slice(0, name.length - 3)
        : name.slice(0, name.length - 2);

    const kanoWord = this.getWord(name, group, this.kanoDictionary);

    if (!kanoWord) {
      return '';
    }
    return `${wordWithOutMasu}${kanoWord}ます`;
  }

  public TojoukenFormByDoushi(name: string, group: string): string {
    const wordWithOutMasu =
      group != '2'
        ? name.slice(0, name.length - 3)
        : name.slice(0, name.length - 2);

    const joukenForm = this.getWord(name, group, this.joukenDictionary);

    if (!joukenForm) {
      return '';
    }
    return `${wordWithOutMasu}${joukenForm}`;
  }

  public TojoukenFormByKeiyoushi(name: string, type: string): string {
    const word = type == 'い' ? name.slice(0, name.length - 1) : name;

    const joukenForm = this.getKeiyoushiWord(name, type, this.joukenDictionary);

    if (!joukenForm) {
      return '';
    }
    return `${word}${joukenForm}`;
  }

  public TojoukenFormByMeishi(name: string): string {
    const joukenForm = this.joukenDictionary.get('meishi');

    if (!joukenForm) {
      return '';
    }
    return `${name}${joukenForm}`;
  }

  public shuffleArray(array: IKotobaData[]): IKotobaData[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  public toKotobaList(kotobaDataList: IKotobaData[]) {
    return kotobaDataList.map((element) => this.ToKotoba(element));
  }

  public ToKotoba(kotobaData: IKotobaData) {
    const kotoba: IKotoba = {
      id: kotobaData.id,
      chapters: this.chaptersService.toChapters(kotobaData.chapters),
      exams: this.examsService.toExams(kotobaData.exams),
      examples: kotobaData.examples,
      kanji: kotobaData.kanji,
      name: kotobaData.name,
      translation: kotobaData.translation,
      created: kotobaData.created,
    };

    return kotoba;
  }

  private getWord(
    name: string,
    group: string,
    dictionary: Map<string, string>
  ) {
    const word = name[name.length - 3];
    const doushiKotoba = group != '2' ? `${group}${word}` : '2';
    return dictionary.get(doushiKotoba);
  }

  private getKeiyoushiWord(
    name: string,
    type: string,
    dictionary: Map<string, string>
  ) {
    const word = name[name.length - 3];
    const keiyoushiKotoba = type != 'い' ? `ikeiyoushi` : 'nakeiyoushi';
    return dictionary.get(keiyoushiKotoba);
  }

  private initializeDictionaries() {
    this.initializeTeForm();
    this.initializeTaForm();
    this.initializeJishoForm();
    this.initializeNaiForm();
    this.initializeKanoForm();
    this.initializeConditionalForm();
  }

  private initializeTeForm() {
    this.teDictionary.set('0き', 'って');
    this.teDictionary.set('1い', 'って');
    this.teDictionary.set('1ち', 'って');
    this.teDictionary.set('1り', 'って');
    this.teDictionary.set('1き', 'いて');
    this.teDictionary.set('1ぎ', 'いで');
    this.teDictionary.set('1み', 'んで');
    this.teDictionary.set('1び', 'んで');
    this.teDictionary.set('1に', 'んで');
    this.teDictionary.set('1し', 'して');
    this.teDictionary.set('2', 'て');
    this.teDictionary.set('3し', 'して');
    this.teDictionary.set('3き', 'きて');
  }

  private initializeTaForm() {
    this.taDictionary.set('0き', 'った');
    this.taDictionary.set('1い', 'った');
    this.taDictionary.set('1ち', 'った');
    this.taDictionary.set('1り', 'った');
    this.taDictionary.set('1き', 'いた');
    this.taDictionary.set('1ぎ', 'いだ');
    this.taDictionary.set('1み', 'んだ');
    this.taDictionary.set('1び', 'んだ');
    this.taDictionary.set('1に', 'んだ');
    this.taDictionary.set('1し', 'した');
    this.taDictionary.set('2', 'た');
    this.taDictionary.set('3し', 'した');
    this.taDictionary.set('3き', 'きた');
  }

  private initializeJishoForm() {
    this.jishoDictionary.set('1い', 'う');
    this.jishoDictionary.set('1ち', 'つ');
    this.jishoDictionary.set('1り', 'る');
    this.jishoDictionary.set('1き', 'く');
    this.jishoDictionary.set('1ぎ', 'ぎ');
    this.jishoDictionary.set('1み', 'む');
    this.jishoDictionary.set('1び', 'ぶ');
    this.jishoDictionary.set('1に', 'ぬ');
    this.jishoDictionary.set('1し', 'す');
    this.jishoDictionary.set('2', 'る');
    this.jishoDictionary.set('3し', 'する');
    this.jishoDictionary.set('3き', 'くる');
  }

  private initializeNaiForm() {
    this.naiDictionary.set('1い', 'わない');
    this.naiDictionary.set('1ち', 'たない');
    this.naiDictionary.set('1り', 'らない');
    this.naiDictionary.set('1き', 'かない');
    this.naiDictionary.set('1ぎ', 'がない');
    this.naiDictionary.set('1み', 'まない');
    this.naiDictionary.set('1び', 'ばない');
    this.naiDictionary.set('1に', 'なない');
    this.naiDictionary.set('1し', 'さない');
    this.naiDictionary.set('2', 'ない');
    this.naiDictionary.set('3し', 'しない');
    this.naiDictionary.set('3き', 'こない');
  }

  private initializeKanoForm() {
    this.kanoDictionary.set('1い', 'え');
    this.kanoDictionary.set('1ち', 'て');
    this.kanoDictionary.set('1り', 'れ');
    this.kanoDictionary.set('1き', 'け');
    this.kanoDictionary.set('1ぎ', 'げ');
    this.kanoDictionary.set('1み', 'め');
    this.kanoDictionary.set('1び', 'べ');
    this.kanoDictionary.set('1に', 'ね');
    this.kanoDictionary.set('1し', 'せ');
    this.kanoDictionary.set('2', 'られ');
    this.kanoDictionary.set('3し', 'でき');
    this.kanoDictionary.set('3き', 'こられ');
  }

  private initializeConditionalForm() {
    this.joukenDictionary.set('1い', 'えば');
    this.joukenDictionary.set('1ち', 'てば');
    this.joukenDictionary.set('1り', 'れば');
    this.joukenDictionary.set('1き', 'けば');
    this.joukenDictionary.set('1ぎ', 'げば');
    this.joukenDictionary.set('1み', 'めば');
    this.joukenDictionary.set('1び', 'べば');
    this.joukenDictionary.set('1に', 'ねば');
    this.joukenDictionary.set('1し', 'せば');
    this.joukenDictionary.set('2', 'れば');
    this.joukenDictionary.set('3し', 'すれば');
    this.joukenDictionary.set('3き', 'くれば');
    this.joukenDictionary.set('meishi', 'なら');
    this.joukenDictionary.set('ikeiyoushi', 'ければ');
    this.joukenDictionary.set('nakeiyoushi', 'なら');
  }
}
