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
import { filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
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
    public readonly store: Store,
    private readonly router: Router,
    private readonly databaseLoaderService: DatabaseLoaderService,
    private readonly databaseLoaderFormService: DatabaseLoaderFormService
  ) {
    this.databaseLoaderService
      .prepareLatestFilesProcessing()
      .pipe(
        filter(file => !!file),
        untilDestroyed(this)
      )
      .subscribe(this.form.get('database')?.patchValue.bind(this));
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
      .pipe(
        tap(() =>
          this.databaseLoaderService.handleSuccessDatabaseReadingEffect(
            this.form.get('database')?.value,
            this.form.get('keyFile')?.value
          )
        ),
        untilDestroyed(this)
      )
      .subscribe(kdbx => {
        this.databaseLoaderService.handleSuccessDatabaseReading(kdbx);
        this.router.navigateByUrl('/database');
      });
  }
}
