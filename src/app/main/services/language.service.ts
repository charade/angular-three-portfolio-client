import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageEnum } from 'src/app/common-utils/enums/languages.enum';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  selected$ = new BehaviorSubject<LanguageEnum | null>(null);

  setLanguage(lang: LanguageEnum): void {
    this.selected$.next(lang);
  }
}
