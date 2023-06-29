import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromCounterComponent from './counter.reducer';
export const FEATURE_NAME = 'counterFeature';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CounterState {
  counterComponent: fromCounterComponent.CounterComponentState;
}

export const reducers: ActionReducerMap<CounterState> = {
  counterComponent: fromCounterComponent.reducer,
};

const selectFeature = createFeatureSelector<CounterState>(FEATURE_NAME);

const selectCounterComponentState = createSelector(
  selectFeature,
  (f) => f.counterComponent,
);

export const selectCounterCurrent = createSelector(
  selectCounterComponentState,
  (c) => c.current,
);
