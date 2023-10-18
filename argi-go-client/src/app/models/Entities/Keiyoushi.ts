import { IKotoba } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Keiyoushi extends IKotoba, IKyougaku {
  keiyoushiType: string;
}
