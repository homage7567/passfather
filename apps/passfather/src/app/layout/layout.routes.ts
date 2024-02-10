import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { entriesResolver, EntriesViewComponent } from '@pf/feature/entries-view';

const routes: Routes = [
  {
    path: 'database',
    component: LayoutComponent,
    children: [
      {
        path: ':groupId',
        component: EntriesViewComponent,
        resolve: {
          entries: entriesResolver
        }
      }
    ]
  }
];

export default routes;
