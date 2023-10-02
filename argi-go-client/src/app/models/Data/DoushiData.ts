import { IKotoba } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface DoushiData extends IKotoba, IKyougaku {
  group: string;
  id: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
}
