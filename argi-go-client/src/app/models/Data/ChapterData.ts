import { BookData } from './BookData';

export interface ChapterData {
  id: string;
  name: string;
  topic: string;
  number: string;
  description: string;
  book: BookData;
}
