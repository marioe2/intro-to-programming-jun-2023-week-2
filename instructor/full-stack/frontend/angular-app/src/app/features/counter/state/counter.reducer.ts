import { createReducer, on } from '@ngrx/store';
import { CounterAction } from './counter.actions';

export interface CounterComponentState {
  current: number;
}

const initialState: CounterComponentState = {
  current: 0,
};

export const reducer = createReducer(
  initialState,
  on(CounterAction.incremented, (currentState) => ({
    current: currentState.current + 1,
  })),
  on(CounterAction.decremented, (currentState) => ({
    current: currentState.current - 1,
  })),
);
