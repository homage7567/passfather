import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { Kdbx, ProtectedValue, Credentials } from 'kdbxweb';
import { DatabaseLoaderRequest } from '../models/database-loader-request.interface';

@Injectable()
export class DatabaseLoaderService {
  public readDatabase({ database, password }: DatabaseLoaderRequest): Observable<Kdbx | null> {
    return from(database.arrayBuffer()).pipe(
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
