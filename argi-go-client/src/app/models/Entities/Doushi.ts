import { IKotoba } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Doushi extends IKotoba, IKyougaku {
  group: string;
  tKei: string;
  taKei: string;
  jishoKei: string;
  naKei: string;
  kanoKei: string;
}
