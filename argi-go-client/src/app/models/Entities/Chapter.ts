import { Book } from './Book';

export interface Chapter {
  id: string;
  name: string;
  tema: string;
  number: string;
  description: string;
  book: Book;
}
