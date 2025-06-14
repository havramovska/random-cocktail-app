import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return localStorageMock[key] || null;
      },
      setItem: (key: string, value: string): void => {
        localStorageMock[key] = value;
      },
      removeItem: (key: string): void => {
        delete localStorageMock[key];
      },
      clear: (): void => {
        localStorageMock = {};
      }
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve an item', () => {
    const testData = { test: 'data' };
    service.setItem('testKey', testData);
    const retrieved = service.getItem('testKey');
    expect(retrieved).toEqual(testData);
  });

  it('should return null for non-existent item', () => {
    const retrieved = service.getItem('nonExistentKey');
    expect(retrieved).toBeNull();
  });

  it('should remove an item', () => {
    const testData = { test: 'data' };
    service.setItem('testKey', testData);
    service.removeItem('testKey');
    const retrieved = service.getItem('testKey');
    expect(retrieved).toBeNull();
  });

  it('should clear all items', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();
    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });

  it('should return null for expired items', () => {
    const testData = { test: 'data' };
    service.setItem('testKey', testData);
    
    // Mock expired item
    const expiredItem = {
      value: testData,
      expiry: new Date().getTime() - 1000 // 1 second in the past
    };
    localStorage.setItem('testKey', JSON.stringify(expiredItem));
    
    const retrieved = service.getItem('testKey');
    expect(retrieved).toBeNull();
  });

  it('should check if item is valid', () => {
    const testData = { test: 'data' };
    service.setItem('testKey', testData);
    expect(service.hasValidItem('testKey')).toBeTruthy();
    expect(service.hasValidItem('nonExistentKey')).toBeFalsy();
  });
}); 