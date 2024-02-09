import { globalConfig, StorageService } from '@pf/core';
import { Observable, of } from 'rxjs';
import { RecentFilesDB } from './recent-files-db.type';
import { RecentFilesDBModel, RecentFilesDBRequest } from './recent-files-db.model';

export class RecentFilesLocalDBStorage implements RecentFilesDB {
  constructor(private readonly storageService: StorageService) {}

  public put(model: RecentFilesDBRequest): void {
    this.storageService.set(`${globalConfig.database.name}`, JSON.stringify(model));
  }

  public get(_id: UUID): Observable<RecentFilesDBModel | null> {
    const rawItem = this.storageService.get(`${globalConfig.database.name}`);

    return of(rawItem ? (JSON.parse(rawItem) as RecentFilesDBModel) : null);
  }

  public getLast(): Observable<RecentFilesDBModel | null> {
    return of(null);
  }
}
