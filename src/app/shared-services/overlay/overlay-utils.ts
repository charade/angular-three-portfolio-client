import { Overlay, OverlayConfig } from '@angular/cdk/overlay';

export namespace OverlayUtils {
  export const getDefaultConfig = (
    overlay: Overlay,
    origin: HTMLElement
  ): OverlayConfig => ({
    width: '20rem',
    height: '28rem',
    hasBackdrop: true,
    scrollStrategy: overlay.scrollStrategies.noop(),
    positionStrategy: overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 2,
          offsetX: -5
        },
      ]),
  });
}
