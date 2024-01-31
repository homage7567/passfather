import { Route } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@pf/database-loader').then(m => m.DatabaseLoaderModule),
    providers: [provideTranslocoScope('database-loader')]
  }
];
