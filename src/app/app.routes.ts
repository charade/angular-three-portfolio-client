import { Routes } from '@angular/router';
import { EntryComponent } from './routes/entry/entry.component';

export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/entry/entry.module').then((m) => m.EntryModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
