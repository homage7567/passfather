import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { getSelectedDB } from '../state/core.selectors';
import { Router } from '@angular/router';

export const databaseLoadedGuard = (): Observable<boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(getSelectedDB).pipe(
    map(selectedDB => {
      if (selectedDB) {
        return true;
      }

      router.navigateByUrl('/loading');
      return false;
    })
  );
};
