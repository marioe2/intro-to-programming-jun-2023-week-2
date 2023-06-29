/* eslint-disable @typescript-eslint/no-empty-interface */
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ListDocuments } from "./list.actions";



export interface ShoppingListEntity {
    id: string;
    description: string;
    purchased: boolean;
}



export interface State extends EntityState<ShoppingListEntity> { }



export const adapter = createEntityAdapter<ShoppingListEntity>();



const initialState = adapter.getInitialState();



export const reducer = createReducer(initialState,
    on(ListDocuments.list, (s, a) => adapter.setAll(a.payload, s)),
    on(ListDocuments.item, (s, a) => adapter.upsertOne(a.payload, s)),
);