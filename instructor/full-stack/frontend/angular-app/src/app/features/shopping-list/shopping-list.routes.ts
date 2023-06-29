import { Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ListComponent } from "./components/list/list.component";
import { CreateComponent } from "./components/create/create.component";

export const SHOPPING_LIST_ROUTES: Routes = [
    {
        path: '',
        component: ShoppingListComponent,
        children: [
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'create',
                component: CreateComponent
            },
            {
                path: '**',
                redirectTo: 'list'
            }
        ]
    }
]