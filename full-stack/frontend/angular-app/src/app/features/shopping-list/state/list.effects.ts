import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { ShoppingFeatureEvents } from './feature.actions';
import { ShoppingListEntity } from './list.reducer';
import { ListDocuments, ListEvents } from './list.actions';
import { environment } from 'src/environments/environment.development';



@Injectable()
export class ListEffects {

    readonly baseUrl = environment.apiUrl;

    markPurchased$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ListEvents.itemsMarkedPurchased),
            mergeMap((originalAction) =>
                this.http
                    .put(
                        this.baseUrl + `/completed-shopping-items/${originalAction.payload.id}`,
                        originalAction.payload,
                    )
                    .pipe(
                        map(() => ({ ...originalAction.payload, purchased: true })),
                        map((updatedItem) => ListDocuments.item({ payload: updatedItem })),
                    ),
            ),
        );
    });

    // when an item is added -> send it to the api -> item
    addItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ListEvents.itemsAdded),
            mergeMap(({ payload }) =>
                this.http
                    .post<ShoppingListEntity>(
                        this.baseUrl + '/shopping-list',
                        payload,
                    )
                    .pipe(map((payload) => ListDocuments.item({ payload }))),
            ),
        );
    });

    // when the feature is entered -> go to the API and get the stuff -> (Action with the shopping list | There was error)



    goGetTheList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppingFeatureEvents.entered),
            switchMap(() =>
                this.http
                    .get<{ data: ShoppingListEntity[] }>(
                        this.baseUrl + '/shopping-list',
                    )
                    .pipe(
                        map((response) => response.data),
                        map((payload) => ListDocuments.list({ payload })),
                    ),
            ),
        );
    });



    logThemAll$ = createEffect(
        () => {
            return this.actions$.pipe(
                tap((a) => console.log(`Got an Action of Type: ${a.type}`)),
            );
        },
        { dispatch: false },
    );



    constructor(private http: HttpClient, private actions$: Actions) { }
}