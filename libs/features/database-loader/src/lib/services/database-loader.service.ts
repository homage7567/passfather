import { inject, Injectable } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { Kdbx, ProtectedValue, Credentials } from 'kdbxweb';
import { DatabaseLoaderRequest } from '../models/database-loader-request.interface';
import { RECENT_FILES_DB, RecentFilesDBRequest } from '@pf/db';
import { DatabasesCoreActions, IS_ELECTRON } from '@pf/core';
import { Store } from '@ngrx/store';
import { WINDOW } from '@ng-web-apis/common';

@Injectable()
export class DatabaseLoaderService {
  private readonly isElectron = inject(IS_ELECTRON);
  private readonly recentFilesDB = inject(RECENT_FILES_DB);
  private readonly store = inject(Store);
  private readonly window = inject(WINDOW);

  public readDatabase({ database, password }: DatabaseLoaderRequest): Observable<Kdbx | null> {
    return from(database.arrayBuffer()).pipe(
      switchMap((buffer: ArrayBuffer) => {
        if (!buffer) {
          return of(null);
        }

        const credentials = new Credentials(ProtectedValue.fromString(password));

        return from(Kdbx.load(buffer, credentials));
      })
    );
  }

  public handleSuccessDatabaseReadingEffect(databaseFile: File, keyFile?: File): void {
    if (!this.isElectron || !databaseFile) {
      return;
    }

    const dbRequest: RecentFilesDBRequest = { name: databaseFile.name, path: databaseFile.path };

    if (keyFile) {
      dbRequest.keyFile = keyFile;
    }

    this.recentFilesDB.put(dbRequest);
  }

  public handleSuccessDatabaseReading(kdbx: Kdbx | null): void {
    if (!kdbx) {
      return;
    }

    this.store.dispatch(DatabasesCoreActions.addDB({ db: Object.freeze(kdbx) }));
    this.store.dispatch(DatabasesCoreActions.selectDB({ id: kdbx.header.dataCipherUuid!.id }));
  }

  public prepareLatestFilesProcessing(): Observable<File | null> {
    if (!this.isElectron) {
      return of(null);
    }

    return this.recentFilesDB.getLast().pipe(
      switchMap(lastRecord => {
        if (!lastRecord) {
          return of(null);
        }

        return from(this.window.electron.loadFile(lastRecord));
      })
    );
  }
}
