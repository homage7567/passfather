import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Kdbx } from 'kdbxweb';
import { Action, createReducer, on } from '@ngrx/store';
import { DatabasesCoreActions } from './core.actions';

export const CORE_TRACKS_FEATURE_KEY = 'coreTracksFeatureKey';

export interface CoreState extends EntityState<Readonly<Kdbx>> {
  selectedDB?: string;
}

export interface CorePartialState {
  readonly [CORE_TRACKS_FEATURE_KEY]: CoreState;
}

function selectDBId(db: Readonly<Kdbx>): string {
  return db.header.dataCipherUuid!.id;
}

export const coreAdapter: EntityAdapter<Readonly<Kdbx>> = createEntityAdapter<Readonly<Kdbx>>({
  selectId: selectDBId
});

const initialState: CoreState = coreAdapter.getInitialState({});

const reducer = createReducer(
  initialState,
  on(DatabasesCoreActions.addDB, (state, { db }) => coreAdapter.addOne(db, state)),
  on(DatabasesCoreActions.closeDB, (state, { id }) => coreAdapter.removeOne(id, state)),
  on(DatabasesCoreActions.selectDB, (state, { id }) => ({ ...state, selectedDB: id }))
);

export function coreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
