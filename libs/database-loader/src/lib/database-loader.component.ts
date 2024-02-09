import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
import { RECENT_FILES_DB, RecentFilesDB } from '@pf/db';
import { IS_ELECTRON } from '@pf/core';
import { WINDOW } from '@ng-web-apis/common';
import { from } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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
    @Inject(IS_ELECTRON) private readonly isElectron: boolean,
    @Inject(RECENT_FILES_DB) private readonly recentFilesDB: RecentFilesDB,
    @Inject(WINDOW) private readonly window: Window,
    private readonly databaseLoaderService: DatabaseLoaderService,
    private readonly databaseLoaderFormService: DatabaseLoaderFormService
  ) {
    this.prepareLatestFilesProcessing();
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
      .subscribe(response => {
        // eslint-disable-next-line no-console
        console.log('--- KDBX', response);
      });
  }

  private prepareLatestFilesProcessing(): void {
    this.form
      .get('database')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe(
        (value: File) =>
          value.path &&
          this.recentFilesDB.put(uuidv4(), {
            name: value.name,
            path: value.path
          })
      );

    this.recentFilesDB
      .getLast()
      .pipe(untilDestroyed(this))
      .subscribe(lastRecord => {
        if (this.isElectron && lastRecord) {
          from(this.window.electron.loadFile(lastRecord))
            .pipe(untilDestroyed(this))
            .subscribe(file => {
              this.form.get('database')?.patchValue(file);
            });
        }
      });
  }
}
