import { Overlay, OverlayConfig } from '@angular/cdk/overlay';

export namespace OverlayUtils {
  export const getDefaultConfig = (
    overlay: Overlay,
    width = '34rem',
    height = '61rem'
  ): OverlayConfig => ({
    width,
    height,
    hasBackdrop: true,
    scrollStrategy: overlay.scrollStrategies.noop(),
    positionStrategy: overlay.position().global(),
  });
}
