import { inject, InjectionToken } from '@angular/core';
import { StorageService } from '@pf/core';
import { WINDOW } from '@ng-web-apis/common';
import { RecentFilesIndexedDBStorage } from './recent-files-indexed-db.storage';
import { RecentFilesLocalDBStorage } from './recent-files-local-db.storage';
import { RecentFilesDB } from './recent-files-db.type';

export const RECENT_FILES_DB = new InjectionToken<RecentFilesDB>('recentFilesDBInjectionToken', {
  factory: () => {
    const storageService = inject(StorageService);
    const window = inject(WINDOW) as Window & typeof globalThis;

    if (window.indexedDB !== undefined && window.indexedDB !== null) {
      return new RecentFilesIndexedDBStorage();
    }

    return new RecentFilesLocalDBStorage(storageService);
  }
});
