import { CustomMap } from '../structures';

export enum LanguageEnum {
  Fr = 1,
  En,
}

export type LanguageResolverType = {
  value: LanguageEnum;
  label: string;
};

export namespace LanguageEnum {
  export const supportedLang = [LanguageEnum.Fr, LanguageEnum.En];
  const langKey = 'languageSettings.languages.';

  export const stringify = new CustomMap<LanguageEnum, string>([
    [LanguageEnum.En, langKey + 'en'],
    [LanguageEnum.Fr, langKey + 'fr'],
  ]);

  export const getLang = new CustomMap<LanguageEnum, string>([
    [LanguageEnum.En, 'en'],
    [LanguageEnum.Fr, 'fr'],
  ]);

  export const languageResolver: LanguageResolverType[] = supportedLang.map(
    (lang) => ({
      value: lang,
      label: stringify.value(lang),
    })
  );
}
