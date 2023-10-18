import { IBaseData } from '../IKotoba';

export interface ExamData extends IBaseData {
  name: string;
  description: string;
  level: string;
}
