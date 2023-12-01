import {
  DestroyRef,
  Injectable,
  InjectionToken,
  Injector,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OverlayUtils } from './overlay-utils';

export const OverlayRefToken = new InjectionToken<OverlayRef>(
  'overlay_ref_token'
);

@Injectable()
export class OverlayService {
  #overlay = inject(Overlay);
  #destroyRef = inject(DestroyRef);

  #currentOverlayRef: OverlayRef;

  open(
    content: ComponentType<any>,
    origin: HTMLElement,
    viewContainer: ViewContainerRef
  ) {
    this.#currentOverlayRef = this.#overlay.create(
      OverlayUtils.getDefaultConfig(this.#overlay, origin)
    );

    const injector = Injector.create({
      providers: [
        { provide: OverlayRefToken, useValue: this.#currentOverlayRef },
      ],
    });

    const componentPortal = new ComponentPortal(
      content,
      viewContainer,
      injector
    );

    this.#currentOverlayRef.attach(componentPortal);

    this.#currentOverlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.#closeOverlay());
  }

  #closeOverlay() {
    this.#currentOverlayRef.dispose();
    this.#currentOverlayRef.detach();
  }
}
