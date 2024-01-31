import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import { getBrowserCultureLang, getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';
import { getLangFn } from '../utils/get-lang-fn';
import { globalConfig } from '@pf/core';

export function provideLanguagePreload() {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (translocoService: TranslocoService, cookieService: CookieService) => {
        return function() {
          const lang = getLangFn({
            cachedLang: cookieService.get(globalConfig.cookies.locale),
            browserLang: getBrowserLang(),
            cultureLang: getBrowserCultureLang(),
            defaultLang: 'ru'
          });

          return translocoService.load(lang);
        };
      },
      multi: true,
      deps: [TranslocoService, CookieService]
    }
  ]);
}
