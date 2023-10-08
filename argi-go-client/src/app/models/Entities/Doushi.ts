import { IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Doushi extends IKotobaData, IKyougaku {
  group: number;
  id: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
}
