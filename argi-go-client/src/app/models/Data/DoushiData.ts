import { IKotobaCreationOrUpdateData, IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface DoushiData extends IKotobaData, IKyougaku {
  group: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
  joukenKei: string;
}

export interface DoushiCreationOrUpdateData
  extends IKotobaCreationOrUpdateData,
    IKyougaku {
  group: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
  joukenKei: string;
}
