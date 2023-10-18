import { IBaseData } from '../IKotoba';

export interface BookData extends IBaseData {
  title: string;
  description: string;
  author: string;
  edition: string;
}
