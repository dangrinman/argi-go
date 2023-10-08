import { ChapterData } from './Data/ChapterData';
import { ExamData } from './Data/ExamData';
import { Chapter } from './Entities/Chapter';
import { Exam } from './Entities/Exam';

export interface IKotobaData {
  name: string;
  translation: string;
  kanji: string;
  examples: string[];
  chapters: ChapterData[];
  exams: ExamData[];
}

export interface IKotoba {
  name: string;
  translation: string;
  kanji: string;
  examples: string[];
  chapters: Chapter[];
  exams: Exam[];
}
