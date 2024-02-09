import { globalConfig, StorageService } from '@pf/core';
import { Observable, of } from 'rxjs';
import { RecentFilesDB } from './recent-files-db.type';
import { RecentFilesDBModel, RecentFilesDBRequest } from './recent-files-db.model';

export class RecentFilesLocalDBStorage implements RecentFilesDB {
  constructor(private readonly storageService: StorageService) {}

  public put(id: UUID, model: RecentFilesDBRequest): void {
    this.storageService.set(`${globalConfig.database.name}${id}`, JSON.stringify(model));
  }

  public get(id: UUID): Observable<RecentFilesDBModel | null> {
    const rawItem = this.storageService.get(`${globalConfig.database.name}${id}`);

    return of(rawItem ? (JSON.parse(rawItem) as RecentFilesDBModel) : null);
  }

  public getLast(): Observable<RecentFilesDBModel | null> {
    return of(null);
  }
}
