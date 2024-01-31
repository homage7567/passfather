import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ThemeOption, ThemeOptionType, ThemeService } from '@pf/theme';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    MenubarModule,
    SharedModule,
    FormsModule,
    TranslocoModule
  ],
  selector: 'pf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly selectedTheme$ = this.themeService.theme$;
  public readonly availableThemes = Object.values(ThemeOption);

  public readonly selectedLanguage = this.translocoService.getActiveLang();
  public readonly availableLanguages = this.translocoService.getAvailableLangs();

  constructor(
    private readonly translocoService: TranslocoService,
    private readonly themeService: ThemeService
  ) {
    this.themeService.init();
  }

  public onChangeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
  }

  public onChangeTheme(themeOption: ThemeOptionType) {
    this.themeService.setTheme(themeOption);
  }
}
