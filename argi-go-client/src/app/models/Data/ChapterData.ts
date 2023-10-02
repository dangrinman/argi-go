import { BookData } from './BookData';

export interface ChapterData {
  id: string;
  name: string;
  tema: string;
  number: string;
  description: string;
  book: BookData;
}
