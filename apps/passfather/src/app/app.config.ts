import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoaderService } from '@pf/localization';
import {
  cookiesStorage,
  provideTranslocoPersistLang,
} from '@ngneat/transloco-persist-lang';
import { getLangFn } from './get-lang-fn';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideTransloco({
      config: {
        availableLangs: ['ru', 'en'],
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoaderService,
    }),
    provideTranslocoPersistLang({
      getLangFn,
      storage: {
        useValue: cookiesStorage(),
      },
    }),
  ],
};
