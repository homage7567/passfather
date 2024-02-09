import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseLoaderForm } from '../models/database-loader-form.interface';
import { DatabaseLoaderRequest } from '../models/database-loader-request.interface';

@Injectable()
export class DatabaseLoaderFormService {
  public buildForm(): FormGroup {
    return new FormGroup<DatabaseLoaderForm>({
      database: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      keyFile: new FormControl<File | null>(null),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  public buildRequest(form: FormGroup<DatabaseLoaderForm>): DatabaseLoaderRequest | null {
    const { database, keyFile, password } = form.getRawValue();

    if (!database || !password) {
      // eslint-disable-next-line no-console
      console.warn('--- DatabaseLoaderFormService.buildRequest - database and password are required');

      return null;
    }

    const request: DatabaseLoaderRequest = {
      database,
      password
    };

    if (keyFile) {
      request.keyFile = keyFile;
    }

    return request;
  }

  public markAllAsDirty(form: FormGroup<DatabaseLoaderForm>) {
    for (const controlsKey in form.controls) {
      if (Object.hasOwn(form.controls, controlsKey)) {
        form.get(controlsKey)?.markAsDirty();
      }
    }
  }
}
