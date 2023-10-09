import { ChapterData } from './Data/ChapterData';
import { ExamData } from './Data/ExamData';
import { ExampleData } from './Data/ExampleData';
import { Chapter } from './Entities/Chapter';
import { Exam } from './Entities/Exam';
import { Example } from './Entities/Example';

export interface IKotobaData {
  name: string;
  translation: string;
  kanji: string;
  examples: ExampleData[];
  chapters: ChapterData[];
  exams: ExamData[];
}

export interface IKotoba {
  name: string;
  translation: string;
  kanji: string;
  examples: Example[];
  chapters: Chapter[];
  exams: Exam[];
}

export interface IKotobaCreationOrUpdateData {
  name: string;
  translation: string;
  kanji: string;
  examples: string[];
  chapters: string[];
  exams: string[];
}
