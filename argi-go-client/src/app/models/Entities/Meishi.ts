import { IKotoba, IKotobaCreationOrUpdate } from '../IKotoba';
import { IKyougaku } from '../IKyougaku';

export interface Meishi extends IKotoba, IKyougaku {
  joukenKei: string;
}

export interface UpdateMeishi extends IKotobaCreationOrUpdate {
  joukenKei: string;
}
