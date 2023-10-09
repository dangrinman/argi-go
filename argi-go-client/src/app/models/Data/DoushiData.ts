import { IKotobaCreationOrUpdateData, IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface DoushiData extends IKotobaData, IKyougaku {
  group: number;
  id: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
}

export interface DoushiCreationOrUpdateData
  extends IKotobaCreationOrUpdateData,
    IKyougaku {
  group: number;
  id: string;
  teKei: string;
  taKei: string;
  jishoKei: string;
  naiKei: string;
  kanoKei: string;
}
