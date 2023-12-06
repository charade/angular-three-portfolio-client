import { NgModule, importProvidersFrom, inject } from '@angular/core';
import { EntryComponent } from './entry.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { RouterModule, Routes } from '@angular/router';
import { LanguageMenuComponent } from './entry-components/language-menu/language-menu.component';
import {
  TRANSLATE_FILES_LOADER,
  customTranslateConfig,
} from 'src/app/common-utils/translate-config';
import { RouterPathEnum } from 'src/app/common-utils/enums/RouterPaths.enum';
import { FilesPathsEnum } from 'src/app/common-utils/enums/translate-files-path.enum';

const entryRoute: Routes = [
  {
    path: RouterPathEnum.Root,
    component: EntryComponent,
  },
];

@NgModule({
  imports: [
    LanguageMenuComponent,
    RouterModule.forChild(entryRoute),
    TranslateModule.forChild(customTranslateConfig),
  ],
  providers: [
    {
      provide: TRANSLATE_FILES_LOADER,
      useValue: [FilesPathsEnum.LanguageSettings],
    },
  ],
})
export class EntryModule {
  #t = inject(TranslateService).use('en');
}
