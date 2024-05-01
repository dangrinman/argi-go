import { IKotoba, IKotobaCreationOrUpdate } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Keiyoushi extends IKotoba, IKyougaku {
  keiyoushiType: string;
  joukenKei: string;
}

export interface UpdateKeiyoushi extends IKotobaCreationOrUpdate, IKyougaku {
  keiyoushiType: string;
  joukenKei: string;
}
