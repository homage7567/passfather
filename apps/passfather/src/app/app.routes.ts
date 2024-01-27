import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../../libs/database-loader/src/lib/database-loader.module'
      ).then((m) => m.DatabaseLoaderModule),
  },
];
