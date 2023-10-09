import { Book } from './Book';

export interface Chapter {
  id: string;
  name: string;
  topic: string;
  number: string;
  description: string;
  book: Book;
}
