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
import { EntryComponent } from './components/entry/entry.component';
import { LanguageService } from './services/language.service';
import { LanguageEnum } from '../common-utils/enums/languages.enum';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const skillsRoutes: Routes = [
  { path: RouterPathEnum.Root, component: EntryComponent },
  { path: RouterPathEnum.Me, loadComponent: () => MainComponent },
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
    {
      provide: TRANSLATE_FILES_LOADER,
      useValue: [FilesPathsEnum.Skills, FilesPathsEnum.LanguageSettings],
    },
  ],
})
export class MainModule {
  lang = inject(LanguageService);
  translateService = inject(TranslateService);

  constructor() {
    this.lang.selected$.subscribe((lang) => {
      const language = LanguageEnum.getLang.value(lang);
      const storedLang = localStorage.getItem('lang');

      this.translateService.use(language || storedLang);
    });
  }
}
