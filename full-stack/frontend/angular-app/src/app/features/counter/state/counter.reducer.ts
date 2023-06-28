import { createReducer, on } from "@ngrx/store";
import * as CounterActions from './counter.actions';

export interface CounterComponentState {
    current: number;
}

const initialState: CounterComponentState = {
    current: 42
}

export const reducer = createReducer(initialState,
    on(CounterActions.incremented, (currentState) => ({
        current: currentState + 1
    }))
)