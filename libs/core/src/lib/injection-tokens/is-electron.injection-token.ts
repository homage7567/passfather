import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

export const IS_ELECTRON = new InjectionToken('isElectronInjectionToken', {
  factory: () => {
    const window = inject(WINDOW);

    return !!window.electron;
  }
})
