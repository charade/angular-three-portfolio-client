import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageEnum } from 'src/app/common-utils/enums/languages.enum';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { RouterPathEnum } from 'src/app/common-utils/enums/RouterPaths.enum';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  LanguageEnum = LanguageEnum;

  #router = inject(Router);
  #languageService = inject(LanguageService);

  onSelectLanguage(lang: LanguageEnum): void {
    this.#languageService.setLanguage(lang);

    // store chosen language in case of refresh;
    localStorage.setItem('lang', LanguageEnum.getLang.value(lang));

    this.#router.navigate([RouterPathEnum.Me]);
  }
}
