import { Routes } from '@angular/router';
import { RouterPathEnum } from './common-utils/enums/RouterPaths.enum';

export const AppRoutes: Routes = [
  {
    path: RouterPathEnum.Root,
    loadChildren: () =>
      import('./routes/entry/entry.module').then((m) => m.EntryModule),
  },
  {
    path: RouterPathEnum.SkillsPath,
    loadChildren: () =>
      import('./routes/main/main.module').then((m) => m.SkillsModule),
  },
  {
    path: RouterPathEnum.NotFound,
    redirectTo: RouterPathEnum.Root,
    pathMatch: 'full',
  },
];
