import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';
import { BaseRoute, databaseLoadedGuard, TranslocoScopeName } from '@pf/core';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.routes'),
    canActivate: [databaseLoadedGuard]
  },
  {
    path: BaseRoute.LOADING,
    // eslint-disable-next-line @nx/enforce-module-boundaries
    loadChildren: () => import('libs/features/database-loader/src/lib/database-loader.routes'),
    providers: [provideTranslocoScope(TranslocoScopeName.DATABASE_LOADER)]
  }
];
