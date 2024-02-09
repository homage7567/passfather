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
import { RECENT_FILES_DB, RecentFilesDB, RecentFilesDBModel, RecentFilesDBRequest } from '@pf/db';
import { DatabasesCoreActions, IS_ELECTRON } from '@pf/core';
import { WINDOW } from '@ng-web-apis/common';
import { from, tap } from 'rxjs';
import { Kdbx } from 'kdbxweb';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

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
    public readonly store: Store,
    @Inject(IS_ELECTRON) private readonly isElectron: boolean,
    @Inject(RECENT_FILES_DB) private readonly recentFilesDB: RecentFilesDB,
    @Inject(WINDOW) private readonly window: Window,
    private readonly router: Router,
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
      .pipe(tap(this.handleSuccessDatabaseReadingEffect.bind(this)), untilDestroyed(this))
      .subscribe(this.handleSuccessDatabaseReading.bind(this));
  }

  private prepareLatestFilesProcessing(): void {
    if (!this.isElectron) {
      return;
    }

    this.recentFilesDB
      .getLast()
      .pipe(untilDestroyed(this))
      .subscribe(this.handleRecentRecordInDatabase.bind(this));
  }

  private handleSuccessDatabaseReadingEffect(response: Kdbx | null) {
    const database = this.form.get('database')?.value;

    if (!response || !this.isElectron || !database) {
      return;
    }

    const keyFile = this.form.get('keyFile')?.value;
    const dbRequest: RecentFilesDBRequest = { name: database.name, path: database.path };

    if (keyFile) {
      dbRequest.keyFile = keyFile;
    }

    this.recentFilesDB.put(dbRequest);
  }

  private handleSuccessDatabaseReading(response: Kdbx | null): void {
    if (!response) {
      return;
    }

    this.store.dispatch(DatabasesCoreActions.addDB({ db: Object.freeze(response) }));
    this.store.dispatch(DatabasesCoreActions.selectDB({ id: response.header.dataCipherUuid!.id }));
    this.router.navigateByUrl('/');
  }

  private handleRecentRecordInDatabase(lastRecord: RecentFilesDBModel | null) {
    if (!lastRecord) {
      return;
    }

    from(this.window.electron.loadFile(lastRecord))
      .pipe(untilDestroyed(this))
      .subscribe(file => this.form.get('database')?.patchValue(file));
  }
}
