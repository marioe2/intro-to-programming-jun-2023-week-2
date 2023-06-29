import { createActionGroup, emptyProps } from '@ngrx/store';

export const CounterAction = createActionGroup({
  source: 'Counter Component',
  events: {
    incremented: emptyProps(),
    decremented: emptyProps(),
  },
});
