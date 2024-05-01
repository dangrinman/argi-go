import { IKotobaCreationOrUpdateData, IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface MeishiData extends IKotobaData, IKyougaku {
  joukenKei: string;
}

export interface MeishiCreationOrUpdateData
  extends IKotobaCreationOrUpdateData,
    IKyougaku {
  joukenKei: string;
}
