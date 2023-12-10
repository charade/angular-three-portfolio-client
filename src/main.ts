import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import {
  TRANSLATE_FILES_LOADER,
  customTranslateConfig,
} from './app/common-utils/translate-config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(AppRoutes, withComponentInputBinding()),
    importProvidersFrom(TranslateModule.forRoot(customTranslateConfig)),
    { provide: TRANSLATE_FILES_LOADER, useValue: [] },
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err));
