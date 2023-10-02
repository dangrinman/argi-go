import { Injectable } from '@angular/core';
import { IKotoba } from '../models/IKotoba';

@Injectable({
  providedIn: 'root',
})
export class KotobaService {
  private teDictionary = new Map<string, string>();
  private jishoDictionary = new Map<string, string>();
  private taDictionary = new Map<string, string>();
  private naiDictionary = new Map<string, string>();
  private kanoDictionary = new Map<string, string>();

  constructor() {
    this.initializeDictionaries();
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

    return `${wordWithOutMasu}${naiWord}ない`;
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

  public shuffleArray(array: IKotoba[]): IKotoba[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
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

  private initializeDictionaries() {
    this.initializeTeForm();
    this.initializeTaForm();
    this.initializeJishoForm();
    this.initializeNaiForm();
    this.initializeKanoForm();
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
    this.naiDictionary.set('1い', 'わ');
    this.naiDictionary.set('1ち', 'た');
    this.naiDictionary.set('1り', 'ら');
    this.naiDictionary.set('1き', 'か');
    this.naiDictionary.set('1ぎ', 'が');
    this.naiDictionary.set('1み', 'ま');
    this.naiDictionary.set('1び', 'ば');
    this.naiDictionary.set('1に', 'な');
    this.naiDictionary.set('1し', 'さ');
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
}
