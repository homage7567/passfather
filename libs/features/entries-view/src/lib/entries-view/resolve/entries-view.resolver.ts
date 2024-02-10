import { KdbxEntry } from 'kdbxweb';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { getSelectedDB } from '@pf/core';
import { map, Observable } from 'rxjs';

export const entriesResolver: ResolveFn<Observable<KdbxEntry[]>> = (route: ActivatedRouteSnapshot) => {
  return inject(Store)
    .select(getSelectedDB)
    .pipe(
      map(db => {
        const group = db?.getGroup(route.paramMap.get('groupId')!);

        return group ? group.entries : [];
      })
    );
};
