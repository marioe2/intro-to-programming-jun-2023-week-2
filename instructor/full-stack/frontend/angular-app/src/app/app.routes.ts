import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BankAccountComponent } from './components/bank-account.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'account',
    component: BankAccountComponent,
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./features/shopping-list/shopping-list.routes').then(
        (m) => m.SHOPPING_LIST_ROUTES,
      ),
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('./features/counter/counter.routes').then((m) => m.COUNTER_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
