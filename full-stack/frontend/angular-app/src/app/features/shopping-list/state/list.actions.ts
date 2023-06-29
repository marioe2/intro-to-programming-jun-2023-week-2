// Events
// Notifications that something has happened (past tense)
// no expectation of what that means from the code that dispatched.



import { createActionGroup, props } from "@ngrx/store";
import { ShoppingListEntity } from "./list.reducer";

type ShoppingListEntityCreateModel = Pick<ShoppingListEntity, 'description'>;

export const ListEvents = createActionGroup({
    source: 'Shopping List Events',
    events: {
        'Items Added': props<{ payload: ShoppingListEntityCreateModel }>(),
        'Items Marked Purchased': props<{ payload: ShoppingListEntity }>()
    }
});


// Commands
// These are actions that are dispatched that mean "DO THIS THING" - there is
// an expectation that something will happen.



// Documents
// This is just the data. Like we are going to need one that just has our list of
// shopping items from the API.



export const ListDocuments = createActionGroup({
    source: 'Shopping List Documents',
    events: {
        list: props<{ payload: ShoppingListEntity[] }>(),
        item: props<{ payload: ShoppingListEntity }>()
    }
});