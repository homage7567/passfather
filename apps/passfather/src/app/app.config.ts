import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@ngneat/transloco';
import { provideLanguagePreload, TranslocoHttpLoaderService, getLangFn } from '@pf/localization';
import { cookiesStorage, provideTranslocoPersistLang } from '@ngneat/transloco-persist-lang';
import { CookieService } from 'ngx-cookie-service';
import { globalConfig } from '@pf/core';

const languageProviders = [
  provideLanguagePreload(),
  provideTransloco({
    config: {
      availableLangs: ['ru', 'en'],
      reRenderOnLangChange: true,
      prodMode: !isDevMode()
    },
    loader: TranslocoHttpLoaderService
  }),
  provideTranslocoPersistLang({
    getLangFn,
    storageKey: globalConfig.cookies.locale,
    storage: {
      useValue: cookiesStorage()
    }
  })
];

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    ...languageProviders
  ]
};
