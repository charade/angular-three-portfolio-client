import {
  IconDefinition,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowUpRightFromSquare,
  faCheck,
  faCheckCircle,
  faClose,
  faDiamond,
} from '@fortawesome/free-solid-svg-icons';
import { CustomMap } from 'src/app/common-utils/structures';

export enum IconEnum {
  ArrowUp = 1,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Diamond,
  ExternalLink,
  Close,
  CheckMark,
}

export namespace IconEnum {
  export const convertToIconName = new CustomMap<IconEnum, IconDefinition>([
    [IconEnum.ArrowUp, faArrowUp],
    [IconEnum.ArrowDown, faArrowDown],
    [IconEnum.ArrowLeft, faArrowLeft],
    [IconEnum.ArrowRight, faArrowRight],
    [IconEnum.Diamond, faDiamond],
    [IconEnum.ExternalLink, faArrowUpRightFromSquare],
    [IconEnum.Close, faClose],
    [IconEnum.CheckMark, faCheckCircle],
  ]);
}
