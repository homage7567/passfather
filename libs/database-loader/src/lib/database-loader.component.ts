import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseLoaderService } from './database-loader.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormsModule } from '@angular/forms';
import { FileLoaderComponent } from '@pf/core';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@UntilDestroy()
@Component({
  selector: 'pf-database-loader',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenubarModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
    FileLoaderComponent,
  ],
  templateUrl: './database-loader.component.html',
  styleUrl: './database-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatabaseLoaderService],
})
export class DatabaseLoaderComponent {
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
  public selectedLanguage = 'ru';

  public password: string | undefined;
  public loadedFile: File | undefined;
  public loadedKeyFile: File | undefined;
  public passwordVisible = false;

  private readonly databaseLoaderService = inject(DatabaseLoaderService);

  public onFileSelected(event: any): void {
    if (!event.target.files?.length) {
      return;
    }

    this.loadedFile = event.target.files[0];
  }

  public onLoadDatabase() {
    if (!this.loadedFile || !this.password) {
      return;
    }

    this.databaseLoaderService
      .readDatabase(this.loadedFile, this.password)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        console.log('--- KDBX', response);
      });
  }
}
