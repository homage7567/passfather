import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { entriesResolver, EntriesViewComponent } from '@pf/feature/entries-view';
import { provideTranslocoScope } from '@ngneat/transloco';
import { LayoutRoute, TranslocoScopeName } from '@pf/core';

const routes: Routes = [
  {
    path: LayoutRoute.DATABASE,
    component: LayoutComponent,
    children: [
      {
        path: ':groupId',
        component: EntriesViewComponent,
        providers: [provideTranslocoScope(TranslocoScopeName.ENTRIES_VIEW)],
        resolve: {
          entries: entriesResolver
        }
      }
    ]
  }
];

export default routes;
