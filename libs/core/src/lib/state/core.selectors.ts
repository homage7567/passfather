import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CORE_TRACKS_FEATURE_KEY, coreAdapter, CoreState } from './core.reducer';

const getCoreState = createFeatureSelector<CoreState>(CORE_TRACKS_FEATURE_KEY);

const { selectEntities } = coreAdapter.getSelectors();

const getCoreEntities = createSelector(getCoreState, selectEntities);

const getSelectedDBId = createSelector(getCoreState, (state: CoreState) => state.selectedDB);

export const getSelectedDB = createSelector(getCoreEntities, getSelectedDBId, (entities, selectedId) =>
  selectedId && entities[selectedId] ? entities[selectedId] : undefined
);
