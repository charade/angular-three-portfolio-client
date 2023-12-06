import { RouterModule, Routes } from '@angular/router';
import { SkillsComponent } from './skills.component';
import { NgModule, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {
  TRANSLATE_FILES_LOADER,
  customTranslateConfig,
} from 'src/app/common-utils/translate-config';
import { RouterPathEnum } from 'src/app/common-utils/enums/RouterPaths.enum';
import { FilesPathsEnum } from 'src/app/common-utils/enums/translate-files-path.enum';

export const skillsRoutes: Routes = [
  { path: RouterPathEnum.Root, loadComponent: () => SkillsComponent },
  {
    path: RouterPathEnum.NotFound,
    redirectTo: RouterPathEnum.SkillsPath,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(skillsRoutes),
    TranslateModule.forChild(customTranslateConfig),
    SkillsComponent,
  ],
  providers: [
    {
      provide: TRANSLATE_FILES_LOADER,
      useValue: [FilesPathsEnum.Skills],
    },
  ],
})
export class SkillsModule {
  #t = inject(TranslateService).use('fr');
}
