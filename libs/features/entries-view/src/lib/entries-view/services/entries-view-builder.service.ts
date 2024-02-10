import { Injectable } from '@angular/core';
import { KdbxEntry } from 'kdbxweb';
import { EntryTableInterface } from '../models/entry-table.interface';

@Injectable()
export class EntriesViewBuilderService {
  public makeEntriesTree(entries: KdbxEntry[]): EntryTableInterface[] {
    return entries.map(entry => ({
      title: entry.fields.get('Title')?.toString() ?? '',
      key: entry.uuid.id
    }));
  }
}
