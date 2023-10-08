import { IKotobaData } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Meishi extends IKotobaData, IKyougaku {
  id: string;
}
