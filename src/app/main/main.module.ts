import { RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {
  TRANSLATE_FILES_LOADER,
  customTranslateConfig,
} from 'src/app/common-utils/translate-config';
import { RouterPathEnum } from 'src/app/common-utils/enums/RouterPaths.enum';
import { FilesPathsEnum } from 'src/app/common-utils/enums/translate-files-path.enum';
import { MainComponent } from './main.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OverlayService } from './services/overlay/overlay.service';

gsap.registerPlugin(ScrollTrigger);

export const skillsRoutes: Routes = [
  { path: RouterPathEnum.Root, loadComponent: () => MainComponent },
  {
    path: RouterPathEnum.NotFound,
    redirectTo: RouterPathEnum.Root,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(skillsRoutes),
    TranslateModule.forChild(customTranslateConfig),
    MainComponent,
  ],
  providers: [
    OverlayService,
    {
      provide: TRANSLATE_FILES_LOADER,
      useValue: [FilesPathsEnum.Skills],
    },
  ],
})
export class MainModule {
  #t = inject(TranslateService).use('en');
}
