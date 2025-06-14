import { Observable, of } from 'rxjs';
import { IUseCase } from './base.use-case';

describe('IUseCase Interface', () => {
  // Create mock implementations for testing
  class MockSyncUseCase implements IUseCase<string, number> {
    execute(params?: string): number {
      return params ? params.length : 0;
    }
  }

  class MockAsyncUseCase implements IUseCase<string, Observable<number>> {
    execute(params?: string): Observable<number> {
      return of(params ? params.length : 0);
    }
  }

  let syncUseCase: IUseCase<string, number>;
  let asyncUseCase: IUseCase<string, Observable<number>>;

  beforeEach(() => {
    syncUseCase = new MockSyncUseCase();
    asyncUseCase = new MockAsyncUseCase();
  });

  it('should be implemented by a class', () => {
    expect(syncUseCase).toBeDefined();
    expect(asyncUseCase).toBeDefined();
  });

  it('should have execute method', () => {
    expect(typeof syncUseCase.execute).toBe('function');
    expect(typeof asyncUseCase.execute).toBe('function');
  });

  it('should support synchronous execution', () => {
    const result = syncUseCase.execute('test');
    expect(result).toBe(4);
  });

  it('should support asynchronous execution', (done) => {
    const result = asyncUseCase.execute('test') as Observable<number>;
    result.subscribe((value: number) => {
      expect(value).toBe(4);
      done();
    });
  });

  it('should handle optional parameters', () => {
    const syncResult = syncUseCase.execute();
    expect(syncResult).toBe(0);

    const asyncResult = asyncUseCase.execute() as Observable<number>;
    asyncResult.subscribe((value: number) => {
      expect(value).toBe(0);
    });
  });

  it('should maintain the contract for any implementation', () => {
    // Verify method signatures
    const syncExecuteMethod = syncUseCase.execute;
    const asyncExecuteMethod = asyncUseCase.execute;

    expect(syncExecuteMethod.length).toBe(1); // One optional parameter
    expect(asyncExecuteMethod.length).toBe(1); // One optional parameter
  });
}); 