import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme, ThemeType } from '../models/theme.enum';
import { CookieService } from 'ngx-cookie-service';
import { ThemeOption, ThemeOptionType } from '../models/theme-option.enum';
import { DOCUMENT } from '@angular/common';
import { globalConfig } from '@pf/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly theme$: Observable<ThemeType>;

  private _theme$ = new BehaviorSubject<ThemeType>(Theme.LIGHT);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cookieService: CookieService
  ) {
    this.theme$ = this._theme$.asObservable();
  }

  public init(): void {
    this.preloadCurrentTheme();
  }

  public setTheme(themeOption: ThemeOptionType): void {
    this.applyThemeOption(themeOption);
  }

  private preloadCurrentTheme(): void {
    const currentThemeOption =
      (this.cookieService.get(globalConfig.cookies.theme) as ThemeOptionType) ||
      ThemeOption.LIGHT;

    this.applyThemeOption(currentThemeOption);
  }

  private applyThemeOption(themeOption: ThemeOptionType): void {
    let theme: ThemeType = Theme.LIGHT;

    if (themeOption === ThemeOption.DARK) {
      theme = Theme.DARK;
    }

    this._theme$.next(theme);
    this.cookieService.set(globalConfig.cookies.theme, themeOption);

    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
  }
}
