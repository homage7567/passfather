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
import { TranslocoModule } from '@ngneat/transloco';

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
    TranslocoModule
  ],
  templateUrl: './database-loader.component.html',
  styleUrl: './database-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatabaseLoaderService]
})
export class DatabaseLoaderComponent {
  public password: string | undefined;
  public loadedFile: File | undefined;
  public loadedKeyFile: File | undefined;

  private readonly databaseLoaderService = inject(DatabaseLoaderService);

  public onLoadDatabase() {
    if (!this.loadedFile || !this.password) {
      return;
    }

    this.databaseLoaderService
      .readDatabase(this.loadedFile, this.password)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        // eslint-disable-next-line no-console
        console.log('--- KDBX', response);
      });
  }
}
