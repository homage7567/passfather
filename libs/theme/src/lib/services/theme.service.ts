import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme, ThemeType } from '../models/theme.enum';
import { CookieService } from 'ngx-cookie-service';
import { ThemeOptions, ThemeOptionsType } from '../models/theme-options.enum';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly theme$: Observable<ThemeType>;

  private _theme$ = new BehaviorSubject<ThemeType>('light');

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cookieService: CookieService
  ) {
    this.theme$ = this._theme$.asObservable();
  }

  public init(): void {
    const currentThemeOption =
      (this.cookieService.get('theme') as ThemeOptionsType) ||
      ThemeOptions.LIGHT;
    this.applyThemeOption(currentThemeOption);
  }

  public setTheme(themeOption: ThemeOptionsType): void {
    this.applyThemeOption(themeOption);
  }

  private applyThemeOption(themeOption: ThemeOptionsType) {
    let theme: ThemeType = Theme.LIGHT;

    if (themeOption === 'dark') {
      theme = Theme.DARK;
    }

    this._theme$.next(theme);
    this.cookieService.set('theme', themeOption);

    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
