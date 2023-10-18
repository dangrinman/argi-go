import { IBaseData } from '../IKotoba';
import { BookData } from './BookData';

export interface ChapterData extends IBaseData {
  name: string;
  topic: string;
  number: string;
  description: string;
  book: BookData;
}
