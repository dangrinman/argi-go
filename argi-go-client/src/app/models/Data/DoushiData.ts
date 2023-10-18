import { IKotobaCreationOrUpdateData, IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface DoushiData extends IKotobaData, IKyougaku {
  group: string;
  tKei: string;
  taKei: string;
  jishoKei: string;
  naKei: string;
  kanoKei: string;
}

export interface DoushiCreationOrUpdateData
  extends IKotobaCreationOrUpdateData,
    IKyougaku {
  group: string;
  tKei: string;
  taKei: string;
  jishoKei: string;
  naKei: string;
  kanoKei: string;
}
