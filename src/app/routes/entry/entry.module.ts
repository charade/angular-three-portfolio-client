import { NgModule, importProvidersFrom, inject } from '@angular/core';
import { EntryComponent } from './entry.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { RouterModule, Routes } from '@angular/router';
import { LanguageMenuComponent } from './entry-components/language-menu/language-menu.component';
import {
  FilesPathsEnum,
  TRANSLATE_FILES_LOADER,
  customTranslateConfig,
} from 'src/app/utils/translate-config';

const entryRoute: Routes = [
  {
    path: '',
    component: EntryComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
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
      multi: true,
    },
  ],
})
export class EntryModule {
  #t = inject(TranslateService).use('en');
}
