import { IKotobaCreationOrUpdateData, IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface KeiyoushiData extends IKotobaData, IKyougaku {
  keiyoushiType: string;
  joukenKei: string;
}

export interface KeiyoushiCreationOrUpdateData
  extends IKotobaCreationOrUpdateData,
    IKyougaku {
  keiyoushiType: string;
  joukenKei: string;
}
