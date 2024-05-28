import {
  IconDefinition,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faDiamond,
} from '@fortawesome/free-solid-svg-icons';
import { CustomMap } from 'src/app/common-utils/structures';

export enum IconEnum {
  ArrowUp = 1,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Diamond,
}

export namespace IconEnum {
  export const convertToIconName = new CustomMap<IconEnum, IconDefinition>([
    [IconEnum.ArrowUp, faArrowUp],
    [IconEnum.ArrowDown, faArrowDown],
    [IconEnum.ArrowLeft, faArrowLeft],
    [IconEnum.ArrowRight, faArrowRight],
    [IconEnum.Diamond, faDiamond],
  ]);
}
