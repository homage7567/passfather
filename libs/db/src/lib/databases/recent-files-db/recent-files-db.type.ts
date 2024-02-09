import { BaseStorage } from '../../interfaces/base-storage.interface';
import { RecentFilesDBModel, RecentFilesDBRequest } from './recent-files-db.model';

export type RecentFilesDB = BaseStorage<RecentFilesDBModel, RecentFilesDBRequest>;
