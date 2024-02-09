import { BrowserWindow } from 'electron';
import { ElectronBridgeContext } from '@pf/bridge';

export {};

declare global {
  interface Window extends BrowserWindow {
    electron: ElectronBridgeContext;
  }

  type UUID = string;
}
