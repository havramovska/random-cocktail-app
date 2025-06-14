import { Observable } from 'rxjs';

export interface IUseCase<T = void, R = void> {
  execute(params?: T): Observable<R> | R;
} 