import { Injectable } from '@angular/core';
import { KdbxEntry } from 'kdbxweb';
import { EntryTableInterface } from '../models/entry-table.interface';

@Injectable()
export class EntriesViewBuilderService {
  public makeEntriesTree(entries: KdbxEntry[]): EntryTableInterface[] {
    return entries.map(entry => ({
      key: entry.uuid.id,
      url: entry.fields.get('URL')?.toString() ?? '',
      title: entry.fields.get('Title')?.toString() ?? '',
      username: entry.fields.get('UserName')?.toString() ?? '',
      email: entry.fields.get('Почта')?.toString() ?? '',
    }));
  }
}
