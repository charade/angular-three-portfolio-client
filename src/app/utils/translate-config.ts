import { HttpBackend, HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModuleConfig,
} from '@ngx-translate/core';

import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export enum FilesPathsEnum {
  LanguageSettings = '../assets/i18n/language-settings/',
  Skills = '../assets.i18n/skills/',
}

// inject translation files dynamically per module
export const TRANSLATE_FILES_LOADER = new InjectionToken<FilesPathsEnum[]>(
  'Translation files paths'
);

const translateMultipleHttpLoaderFactory = (
  httpBackend: HttpBackend,
  paths: FilesPathsEnum[]
): MultiTranslateHttpLoader => new MultiTranslateHttpLoader(httpBackend, paths);

class CMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    console.log('failed to load: ', params.interpolateParams);
    return '';
  }
}
export const customTranslateConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: translateMultipleHttpLoaderFactory,
    deps: [HttpBackend, TRANSLATE_FILES_LOADER],
  },
  missingTranslationHandler: {
    provide: MissingTranslationHandler,
    useClass: CMissingTranslationHandler,
  },
  defaultLanguage: 'en',
};
