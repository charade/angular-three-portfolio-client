import {
  IconDefinition,
  faAudioDescription,
  faCheck,
  faCircleXmark,
  faGlobeAfrica,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { CustomMap } from 'src/app/utils/structures';

export enum IconEnum {
  Globe = 1,
  Close,
  Language,
  Audio,
  Check,
}

export namespace IconEnum {
  export const convertToIconName = new CustomMap<IconEnum, IconDefinition>([
    [IconEnum.Globe, faGlobeAfrica],
    [IconEnum.Close, faCircleXmark],
    [IconEnum.Language, faLanguage],
    [IconEnum.Audio, faAudioDescription],
    [IconEnum.Check, faCheck],
  ]);
}
