export interface RecentFilesDBRequest {
  path: string;
  name: string;
}

export interface RecentFilesDBModel extends RecentFilesDBRequest {
  id: UUID;
}
