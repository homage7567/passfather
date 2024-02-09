import { createActionGroup, props } from '@ngrx/store';
import { Kdbx } from 'kdbxweb';

export const DatabasesCoreActions = createActionGroup({
  source: '[Core] Databases Actions',
  events: {
    selectDB: props<{ id: string }>(),
    addDB: props<{ db: Readonly<Kdbx> }>(),
    closeDB: props<{ id: string }>()
  }
});
