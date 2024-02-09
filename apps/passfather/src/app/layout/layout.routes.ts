import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { EntriesViewComponent } from '@pf/feature/entries-view';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: EntriesViewComponent
      }
    ]
  }
];

export default routes;
