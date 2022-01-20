import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CoreModule } from '../../core.module';

@Injectable()
export class StorageService implements Storage {
  get length(): number {
    return sessionStorage.length;
  }
  getItem(key: string): string | null {
    return this.decodeValue(sessionStorage.getItem(this.encodeKey(key)));
  }
  key(index: number): string | null {
    return sessionStorage.key(index);
  }
  removeItem(key: string): void {
    sessionStorage.removeItem(this.encodeKey(key));
  }
  setItem(key: string, value: any): void {
    sessionStorage.setItem(this.encodeKey(key), this.encodeValue(value));
  }

  clear() {
    sessionStorage.clear();
  }
  private encodeKey(key: string) {
    if (environment.production) {
      return btoa(key);
    }
    return key;
  }

  private encodeValue(value: any) {
    if (value === undefined) {
      value = null;
    }
    const valueStr = JSON.stringify(value);
    if (environment.production) {
      return btoa(valueStr);
    }
    return valueStr;
  }

  private decodeValue(rawValue: string | null) {
    if (rawValue === null) {
      return null;
    }
    let valueStr = rawValue;
    if (environment.production) {
      valueStr = atob(rawValue);
    }
    try {
      return JSON.parse(valueStr);
    } catch (error) {
      return null;
    }
  }
}
