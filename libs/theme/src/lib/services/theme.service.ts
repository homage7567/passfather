import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, Observable, of, shareReplay, startWith, switchMap } from 'rxjs';
import { Theme, ThemeType } from '../models/theme.enum';
import { CookieService } from 'ngx-cookie-service';
import { ThemeOption, ThemeOptionType } from '../models/theme-option.enum';
import { DOCUMENT } from '@angular/common';
import { globalConfig } from '@pf/core';
import { WINDOW } from '@ng-web-apis/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly themeOption$: Observable<ThemeOptionType>;
  private readonly _themeOption$ = new BehaviorSubject<ThemeOptionType>(this.preloadTheme());

  constructor(
    @Inject(WINDOW) private readonly window: Window,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cookieService: CookieService
  ) {
    this.themeOption$ = this._themeOption$.asObservable();

    this.themeOption$
      .pipe(
        switchMap(this.getThemeFromThemeOption.bind(this)),
        shareReplay({ bufferSize: 1, refCount: true }),
        untilDestroyed(this)
      )
      .subscribe(theme => this.setUpTheme(theme));
  }

  public setTheme(themeOption: ThemeOptionType): void {
    this._themeOption$.next(themeOption);
  }

  private preloadTheme(): ThemeOptionType {
    return this.cookieService.check(globalConfig.cookies.theme)
      ? (this.cookieService.get(globalConfig.cookies.theme) as ThemeOptionType)
      : ThemeOption.SYSTEM;
  }

  private getThemeFromThemeOption(themeOption: ThemeOptionType): Observable<ThemeType> {
    this.cookieService.set(globalConfig.cookies.theme, themeOption);

    switch (themeOption) {
      case ThemeOption.LIGHT: {
        return of(Theme.LIGHT);
      }
      case ThemeOption.DARK: {
        return of(Theme.DARK);
      }
      default: {
        const matchMediaColorScheme = this.window.matchMedia('(prefers-color-scheme: dark)');

        return fromEvent(matchMediaColorScheme, 'change').pipe(
          startWith(matchMediaColorScheme.matches),
          map(() => (matchMediaColorScheme.matches ? Theme.DARK : Theme.LIGHT))
        );
      }
    }
  }

  private setUpTheme(theme: ThemeType) {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
  }
}
