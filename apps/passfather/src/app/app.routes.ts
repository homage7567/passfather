import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';
import { databaseLoadedGuard } from '@pf/core';

export const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./layout/layout.routes'),
        canActivate: [databaseLoadedGuard]
      },
      {
        path: 'load',
        // eslint-disable-next-line @nx/enforce-module-boundaries
        loadChildren: () => import('libs/features/database-loader/src/lib/database-loader.routes'),
        providers: [provideTranslocoScope('database-loader')]
      }
    ]
  }
];
