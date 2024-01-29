import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ThemeOptionsType, ThemeService } from '@pf/theme';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownModule, MenubarModule, SharedModule, FormsModule],
  selector: 'pf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' }
  ];

  public readonly languages = [
    { label: 'RU', code: 'ru' },
    { label: 'EN', code: 'en' }
  ];

  public selectedTheme$ = this.themeService.theme$;
  public selectedLanguage = this.translocoService.getActiveLang();

  constructor(private readonly translocoService: TranslocoService, private readonly themeService: ThemeService) {
    this.themeService.init();
  }

  public onChangeLanguage(languageCode: string) {
    this.translocoService.setActiveLang(languageCode);
  }

  public onChangeTheme(themeOption: ThemeOptionsType) {
    this.themeService.setTheme(themeOption);
  }
}
