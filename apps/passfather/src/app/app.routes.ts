import { Route } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';

export const loader = ['ru', 'en'].reduce((acc, lang) => {
  // @ts-ignore
  acc[lang] = () => import(`../assets/i18n/database-loader/${lang}.json`);
  return acc;
}, {});

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../../libs/database-loader/src/lib/database-loader.module'
      ).then((m) => m.DatabaseLoaderModule),
    providers: [provideTranslocoScope('database-loader')],
  },
];
