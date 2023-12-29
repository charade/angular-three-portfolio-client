import {
  IconDefinition,
  faAudioDescription,
  faCheck,
  faCircleXmark,
  faDiagramProject,
  faGlobeAfrica,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { CustomMap } from 'src/app/common-utils/structures';

export enum IconEnum {
  Globe = 1,
  Close,
  Language,
  Audio,
  Check,
  Projects
}

export namespace IconEnum {
  export const convertToIconName = new CustomMap<IconEnum, IconDefinition>([
    [IconEnum.Globe, faGlobeAfrica],
    [IconEnum.Close, faCircleXmark],
    [IconEnum.Language, faLanguage],
    [IconEnum.Audio, faAudioDescription],
    [IconEnum.Check, faCheck],
    [IconEnum.Projects, faDiagramProject]
  ]);
}
