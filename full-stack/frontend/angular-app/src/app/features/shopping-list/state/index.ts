import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromList from './list.reducer';
import { ShoppingListItemModel } from '../models';
export const FEATURE_NAME = 'shoppingFeature';



// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShoppingFeatureState {
    list: fromList.State;
}



export const reducers: ActionReducerMap<ShoppingFeatureState> = {
    list: fromList.reducer,
};

const selectFeature = createFeatureSelector<ShoppingFeatureState>(FEATURE_NAME);



const selectListBranch = createSelector(selectFeature, (f) => f.list);



const { selectAll: selectShoppingListEntityArray } =
    fromList.adapter.getSelectors(selectListBranch);



// a selector that will give the data we need for our list component.



export const selectShoppingListModel = createSelector(
    selectShoppingListEntityArray,
    (m) => m as ShoppingListItemModel[],
);