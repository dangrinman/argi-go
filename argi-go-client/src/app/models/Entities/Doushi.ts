import { IKotoba } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Doushi extends IKotoba, IKyougaku {
  group: number;
  id: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
}
