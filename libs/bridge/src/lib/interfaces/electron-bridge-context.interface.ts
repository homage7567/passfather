import { RecentFilesDBModel } from '@pf/db';

export interface ElectronBridgeContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAppVersion: () => Promise<any>;
  platform: NodeJS.Platform;
  loadFile: (filePath: RecentFilesDBModel) => Promise<File>;
}
