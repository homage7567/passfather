import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    DropdownModule,
    MenubarModule,
    SharedModule,
    FormsModule,
  ],
  selector: 'pf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly translocoService = inject(TranslocoService);

  public readonly themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ];

  public readonly languages = [
    { label: 'RU', code: 'ru' },
    { label: 'EN', code: 'en' },
  ];

  public selectedTheme = 'light';
  public selectedLanguage = this.translocoService.getActiveLang();

  public onChangeLanguage(languageCode: string) {
    this.translocoService.setActiveLang(languageCode);
  }
}
