import { IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Keiyoushi extends IKotobaData, IKyougaku {
  id: string;
  keiyoushiType: string;
}
