import { IKotoba } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface MeishiData extends IKotoba, IKyougaku {
  Id: string;
}
