import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { Kdbx, ProtectedValue, Credentials } from 'kdbxweb';

@Injectable()
export class DatabaseLoaderService {
  public readDatabase(file: File, password: string): Observable<Kdbx | null> {
    return from(file.arrayBuffer()).pipe(
      switchMap((buffer: ArrayBuffer) => {
        if (!buffer) {
          return of(null);
        }

        const credentials = new Credentials(
          ProtectedValue.fromString(password)
        );

        return from(Kdbx.load(buffer, credentials));
      })
    );
  }
}
