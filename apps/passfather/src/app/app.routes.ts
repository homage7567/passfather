import { Route } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';

export const loader = ['ru', 'en'].reduce((acc, lang) => {
  // @ts-expect-error некорректная обработка ошибки
  acc[lang] = () => import(`../assets/i18n/database-loader/${lang}.json`);
  return acc;
}, {});

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@pf/database-loader').then(m => m.DatabaseLoaderModule),
    providers: [provideTranslocoScope('database-loader')]
  }
];
