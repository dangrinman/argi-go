import { InjectionToken } from '@angular/core';

export class BaseURLToken extends InjectionToken<string> {
  constructor(public readonly url: string) {
    super(url);
  }
}
