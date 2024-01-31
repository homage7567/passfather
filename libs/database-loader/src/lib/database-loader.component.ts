import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseLoaderService } from './services/database-loader.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReactiveFormsModule } from '@angular/forms';
import { FileLoaderComponent } from '@pf/ui-kit';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TranslocoModule } from '@ngneat/transloco';
import { DatabaseLoaderFormService } from './services/database-loader-form.service';

@UntilDestroy()
@Component({
  selector: 'pf-database-loader',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  providers: [DatabaseLoaderService, DatabaseLoaderFormService]
})
export class DatabaseLoaderComponent {
  public readonly form = this.databaseLoaderFormService.buildForm();

  constructor(
    private readonly databaseLoaderService: DatabaseLoaderService,
    private readonly databaseLoaderFormService: DatabaseLoaderFormService
  ) {
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.databaseLoaderFormService.markAllAsDirty(this.form);

      return;
    }

    const request = this.databaseLoaderFormService.buildRequest(this.form);

    if (!request) {
      return;
    }

    this.databaseLoaderService
      .readDatabase(request)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        // eslint-disable-next-line no-console
        console.log('--- KDBX', response);
      });
  }
}
