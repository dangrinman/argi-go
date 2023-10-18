import { IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';
import { ChapterData } from './ChapterData';
import { ExamData } from './ExamData';

export interface KeiyoushiData extends IKotobaData, IKyougaku {
  keiyoushiType: string;
  exams: ExamData[];
  chapters: ChapterData[];
}
