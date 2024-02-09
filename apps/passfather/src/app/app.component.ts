import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ThemeOption, ThemeService } from '@pf/theme';
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
  public readonly themeService = inject(ThemeService);
  public readonly translocoService = inject(TranslocoService);

  public readonly selectedTheme$ = this.themeService.themeOption$;
  public readonly availableThemes = Object.values(ThemeOption);

  public readonly selectedLanguage = this.translocoService.getActiveLang();
  public readonly availableLanguages = this.translocoService.getAvailableLangs();
}
