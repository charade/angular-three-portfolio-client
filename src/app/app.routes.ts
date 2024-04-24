import { Routes } from '@angular/router';
import { RouterPathEnum } from './common-utils/enums/RouterPaths.enum';

export const AppRoutes: Routes = [
  {
    path: RouterPathEnum.Root,
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: RouterPathEnum.NotFound,
    redirectTo: RouterPathEnum.Root,
    pathMatch: 'full',
  },
];
