import { IBaseData } from '../IKotoba';

export interface Book extends IBaseData {
  name: string;
  description: string;
  author: string;
  edition: string;
}
