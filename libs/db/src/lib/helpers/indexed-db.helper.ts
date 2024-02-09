import Dexie from 'dexie';

export abstract class IndexedDbHelper {
  public static reopenIfClosed(db: Dexie) {
    if (!!db && !db.isOpen()) {
      db.open();
    }
  }
}
