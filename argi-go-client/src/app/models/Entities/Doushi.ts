import { IKotoba, IKotobaCreationOrUpdate } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Doushi extends IKotoba, IKyougaku {
  group: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
  joukenKei: string;
}

export interface UpdateDoushi extends IKotobaCreationOrUpdate, IKyougaku {
  group: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
  joukenKei: string;
}
