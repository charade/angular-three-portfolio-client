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
  const supportedLang = [LanguageEnum.Fr, LanguageEnum.En];
  const langKey = 'languageSettings.languages.';

  const stringify = new CustomMap<LanguageEnum, string>([
    [LanguageEnum.En, langKey + 'en'],
    [LanguageEnum.Fr, langKey + 'fr'],
  ]);

  export const languageResolver: LanguageResolverType[] = supportedLang.map(
    (lang) => ({
      value: lang,
      label: stringify.value(lang),
    })
  );
}
