import { app, autoUpdater, dialog, MessageBoxOptions } from 'electron';
import { platform, arch } from 'os';
import { updateServerUrl } from '../constants';
import App from '../app';

export default class UpdateEvents {
  // initialize auto update service - most be invoked only in production
  static initAutoUpdateService() {
    const platformArch = platform() === 'win32' ? platform() : `${platform()}_${arch()}`;
    const version = app.getVersion();
    const feed: Electron.FeedURLOptions = {
      url: `${updateServerUrl}/update/${platformArch}/${version}`
    };

    if (!App.isDevelopmentMode()) {
      // eslint-disable-next-line no-console
      console.log('Initializing auto update service...\n');

      autoUpdater.setFeedURL(feed);
      UpdateEvents.checkForUpdates();
    }
  }

  // check for updates - most be invoked after initAutoUpdateService() and only in production
  static checkForUpdates() {
    if (!App.isDevelopmentMode() && autoUpdater.getFeedURL() !== '') {
      autoUpdater.checkForUpdates();
    }
  }
}

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, _) => {
  const dialogOpts: MessageBoxOptions = {
    type: 'info' as const,
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  };

  dialog.showMessageBox(dialogOpts).then(returnValue => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('checking-for-update', () => {
  // eslint-disable-next-line no-console
  console.log('Checking for updates...\n');
});

autoUpdater.on('update-available', () => {
  // eslint-disable-next-line no-console
  console.log('New update available!\n');
});

autoUpdater.on('update-not-available', () => {
  // eslint-disable-next-line no-console
  console.log('Up to date!\n');
});

autoUpdater.on('before-quit-for-update', () => {
  // eslint-disable-next-line no-console
  console.log('Application update is about to begin...\n');
});

autoUpdater.on('error', message => {
  // eslint-disable-next-line no-console
  console.error('There was a problem updating the application');

  // eslint-disable-next-line no-console
  console.error(message, '\n');
});
