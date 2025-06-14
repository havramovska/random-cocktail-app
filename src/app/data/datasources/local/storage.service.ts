import { Injectable } from '@angular/core';

interface StorageItem<T> {
  value: T;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private SIX_HOURS_MS = 6 * 60 * 60 * 1000;

  setItem<T>(key: string, value: T): void {
    const item: StorageItem<T> = {
      value,
      expiry: new Date().getTime() + this.SIX_HOURS_MS
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem<T>(key: string): T | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item: StorageItem<T> = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  hasValidItem(key: string): boolean {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return false;

    const item: StorageItem<any> = JSON.parse(itemStr);
    return !item.expiry || new Date().getTime() <= item.expiry;
  }
} 