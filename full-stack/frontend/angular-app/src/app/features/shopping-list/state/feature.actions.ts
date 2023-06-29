import { createActionGroup, emptyProps } from '@ngrx/store';

export const ShoppingFeatureEvents = createActionGroup({
    source: 'Shopping Feature Events',
    events: {
        entered: emptyProps(),
    },
});