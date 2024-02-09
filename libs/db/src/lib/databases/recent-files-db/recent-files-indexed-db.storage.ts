import Dexie, { PromiseExtended } from 'dexie';
import { globalConfig } from '@pf/core';
import { catchError, from, map, Observable, of, take } from 'rxjs';
import { RecentFilesDB } from './recent-files-db.type';
import { IndexedDbHelper } from '../../helpers/indexed-db.helper';
import { RecentFilesDBModel, RecentFilesDBRequest } from './recent-files-db.model';
import { v4 as uuidv4 } from 'uuid';

class RecentFIlesIndexedDBBaseStorage extends Dexie {
  public recentFiles: Dexie.Table<RecentFilesDBModel, UUID>;

  constructor() {
    super(globalConfig.database.name);

    this.version(1).stores({
      recentFiles: 'id'
    });

    this.recentFiles = this.table('recentFiles');
  }
}

export class RecentFilesIndexedDBStorage extends RecentFIlesIndexedDBBaseStorage implements RecentFilesDB {
  private readonly db = new RecentFIlesIndexedDBBaseStorage();

  public put(request: RecentFilesDBRequest): void {
    IndexedDbHelper.reopenIfClosed(this.db);

    const id = uuidv4();

    this.db.transaction('rw', this.db.recentFiles, () => this.db.recentFiles.put({ id, ...request }, id));
  }

  public get(id: UUID): Observable<RecentFilesDBModel | null> {
    IndexedDbHelper.reopenIfClosed(this.db);

    const transaction: PromiseExtended<RecentFilesDBModel | undefined> = this.db.transaction(
      'rw',
      this.db.recentFiles,
      () => this.db.recentFiles.get({ id })
    );

    return from(transaction).pipe(
      catchError(() => of(null)),
      take(1),
      map(record => record ?? null)
    );
  }

  public getLast(): Observable<RecentFilesDBModel | null> {
    IndexedDbHelper.reopenIfClosed(this.db);

    return from(this.db.recentFiles.toCollection().last()).pipe(
      take(1),
      map(lastRecord => lastRecord ?? null)
    );
  }
}
