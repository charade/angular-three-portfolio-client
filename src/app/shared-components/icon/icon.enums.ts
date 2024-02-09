import {
  IconDefinition,
  faArrowDown,
  faArrowUp,
  faAudioDescription,
  faCheck,
  faCircleXmark,
  faDiagramProject,
  faDiamond,
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
  Projects,
  ArrowUp,
  ArrowDown,
  Diamond,
}

export namespace IconEnum {
  export const convertToIconName = new CustomMap<IconEnum, IconDefinition>([
    [IconEnum.Globe, faGlobeAfrica],
    [IconEnum.Close, faCircleXmark],
    [IconEnum.Language, faLanguage],
    [IconEnum.Audio, faAudioDescription],
    [IconEnum.Check, faCheck],
    [IconEnum.Projects, faDiagramProject],
    [IconEnum.ArrowUp, faArrowUp],
    [IconEnum.ArrowDown, faArrowDown],
    [IconEnum.Diamond, faDiamond],
  ]);
}
