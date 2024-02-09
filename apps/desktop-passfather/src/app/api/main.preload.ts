import { contextBridge, ipcRenderer } from 'electron';
import { ElectronBridgeContext } from '@pf/bridge';
import * as fs from 'fs';
import { RecentFilesDBModel } from '@pf/db';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  loadFile: (model: RecentFilesDBModel) => {
    return new Promise((resolve, reject) => {
      fs.readFile(model.path, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const blob = new Blob([data]);
        const file = new File([blob], model.name);

        resolve(file);
      });
    });
  }
} as ElectronBridgeContext);
