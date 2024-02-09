import { FormControl } from '@angular/forms';

export interface DatabaseLoaderForm {
  password: FormControl<string>;
  keyFile: FormControl<File | null>;
  database: FormControl<File | null>;
}
