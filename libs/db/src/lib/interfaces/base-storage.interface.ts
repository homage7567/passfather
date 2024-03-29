import { Observable } from 'rxjs';

export interface BaseStorage<T extends R, R> {
  put(value: R): void;

  get(id: UUID): Observable<T | null>;

  getLast(): Observable<T | null>;
}
