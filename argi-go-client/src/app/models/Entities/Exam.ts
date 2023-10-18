import { IBaseData } from '../IKotoba';

export interface Exam extends IBaseData {
  name: string;
  description: string;
  level: string;
}
