import { ChapterData } from './Data/ChapterData';
import { ExamData } from './Data/ExamData';

export interface IKotoba {
  name: string;
  translation: string;
  kanji: string;
  examples?: string[];
  chapters?: ChapterData[];
  exams?: ExamData[];
}
