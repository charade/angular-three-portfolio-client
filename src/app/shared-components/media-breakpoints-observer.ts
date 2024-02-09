import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'media-breakpoints-observer',
  template: '',
})
export class MediaBreakPointsObserver implements OnInit, OnDestroy {
  isDeviceHandset: WritableSignal<boolean> = signal(false);
  isDeviceXS: WritableSignal<boolean> = signal(false);
  isDeviceS: WritableSignal<boolean> = signal(false);
  isDeviceTabletLandscape: WritableSignal<boolean> = signal(false);
  isDeviceSm: WritableSignal<boolean> = signal(false);
  isDeviceM: WritableSignal<boolean> = signal(false);
  isDeviceL: WritableSignal<boolean> = signal(false);
  isDeviceXL: WritableSignal<boolean> = signal(false);

  #mediaSizeObserver = inject(BreakpointObserver);
  #subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.#subscriptions.push(
      this.#mediaSizeObserver
        .observe('(min-width: 360px)')
        .subscribe((media) => this.isDeviceXS.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 389px)')
        .subscribe((media) => this.isDeviceS.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 500px)')
        .subscribe((media) => this.isDeviceSm.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 768px)')
        .subscribe((media) => this.isDeviceM.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 900px)')
        .subscribe((media) => this.isDeviceL.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 1025px)')
        .subscribe((media) => this.isDeviceXL.set(media.matches))
    );
  }

  ngOnDestroy(): void {}
}
