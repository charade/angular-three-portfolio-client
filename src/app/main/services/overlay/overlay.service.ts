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

export const OVERLAY_REF_TOKEN = new InjectionToken<OverlayRef>('overlay_ref');

@Injectable()
export class OverlayService {
  #overlay = inject(Overlay);
  #destroyRef = inject(DestroyRef);

  #currentOverlayRef: OverlayRef;

  open(
    content: ComponentType<any>,
    viewContainer: ViewContainerRef,
    data?: { [k: string]: any },
    size?: { width: string; height: string }
  ) {
    this.#currentOverlayRef = this.#overlay.create(
      OverlayUtils.getDefaultConfig(this.#overlay, size?.width, size?.height)
    );

    const injector = Injector.create({
      providers: [
        { provide: OVERLAY_REF_TOKEN, useValue: this.#currentOverlayRef },
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
