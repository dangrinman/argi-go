import { ChapterData } from './Data/ChapterData';
import { ExamData } from './Data/ExamData';
import { ExampleData } from './Data/ExampleData';
import { Chapter } from './Entities/Chapter';
import { Exam } from './Entities/Exam';
import { Example } from './Entities/Example';

export interface IKotobaData extends IBaseData {
  name: string;
  translation: string[];
  type?: string;
  kanji: string;
  examples: ExampleData[];
  chapters: ChapterData[];
  exams: ExamData[];
}

export interface IKotoba extends IBaseData {
  name: string;
  translation: string[];
  kanji: string;
  type?: string;
  examples: Example[];
  chapters: Chapter[];
  exams: Exam[];
}

export interface IKotobaCreationOrUpdateData extends IBaseData {
  name: string;
  translation: string[];
  kanji: string;
  examples: string[];
  chapters: string[];
  exams: string[];
}

export interface IKotobaCreationOrUpdate extends IBaseData {
  name: string;
  translation: string[];
  kanji: string;
  examples: string[];
  chapters: string[];
  exams: string[];
}

export interface IBaseData {
  id: string;
  created: Date;
}

export interface IKeiKotoba {
  word: string;
  keiWork: string;
}
