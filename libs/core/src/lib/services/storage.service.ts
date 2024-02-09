import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { CONFIG_PREFIX } from '../constants/global-config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage = inject(LOCAL_STORAGE);

  public has(key: string): boolean {
    return !!this.storage.getItem(`${CONFIG_PREFIX}${key}`);
  }

  public get(key: string): string | null {
    return this.storage.getItem(`${CONFIG_PREFIX}${key}`);
  }

  public set(key: string, value: string): void {
    this.storage.setItem(`${CONFIG_PREFIX}${key}`, value);
  }
}
