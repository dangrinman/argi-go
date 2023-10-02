import { IKotoba } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';
import { ChapterData } from './ChapterData';
import { ExamData } from './ExamData';

export interface KeiyoushiData extends IKotoba, IKyougaku {
  id: string;
  keiyoushiType: string;
  exams: ExamData[];
  chapters: ChapterData[];
}
