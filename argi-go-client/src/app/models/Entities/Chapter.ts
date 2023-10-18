import { IBaseData } from '../IKotoba';
import { Book } from './Book';

export interface Chapter extends IBaseData {
  name: string;
  topic: string;
  number: string;
  description: string;
  book: Book;
}
