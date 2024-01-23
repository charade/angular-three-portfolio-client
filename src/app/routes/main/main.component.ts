import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import gsap from 'gsap';

import { ScrollProgressbar } from './components/scroll-progressbar/scroll-progressbar.component';
import { CanvasComponent } from './three/canvas.component';
import { AppIconComponent } from 'src/app/shared-components/icon/icon.component';
import { IconEnum } from 'src/app/shared-components/icon/icon.enums';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IntroComponent } from './components/intro/intro.component';
import { RodinThinkerModelService } from './three/services/rodin-thinker';
import { WomanOnStairsModelService } from './three/services/woman-on-stairs';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { RedWallModelService } from './three/services/red-wall';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    TranslateModule,
    NgClass,
    AsyncPipe,
    ScrollProgressbar,
    CanvasComponent,
    AppIconComponent,
    IntroComponent,
    SoftSkillsComponent,
  ],
  providers: [
    RodinThinkerModelService,
    WomanOnStairsModelService,
    RedWallModelService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  isDeviceHandset: WritableSignal<boolean> = signal(false);
  isDeviceS: WritableSignal<boolean> = signal(false);
  isDeviceTabletLandscape: WritableSignal<boolean> = signal(false);
  isDeviceSm: WritableSignal<boolean> = signal(false);
  isDeviceM: WritableSignal<boolean> = signal(false);
  isDeviceL: WritableSignal<boolean> = signal(false);
  isDeviceXL: WritableSignal<boolean> = signal(false);
  loadingProgress: WritableSignal<number> = signal(0);
  loadingComplete: WritableSignal<boolean> = signal(false);

  IconEnum = IconEnum;
  animationTimeLine = gsap.timeline();

  #mediaSizeObserver = inject(BreakpointObserver);
  #subscriptions: Subscription[] = [];

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.#subscriptions.push(
      this.#mediaSizeObserver
        .observe('(min-width: 390px)')
        .subscribe((media) => this.isDeviceS.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 400px)')
        .subscribe((media) => this.isDeviceSm.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 500px)')
        .subscribe((media) => this.isDeviceM.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 768px)')
        .subscribe((media) => this.isDeviceL.set(media.matches)),
      this.#mediaSizeObserver
        .observe('(min-width: 1024px)')
        .subscribe((media) => this.isDeviceXL.set(media.matches))
    );
  }

  ngOnDestroy(): void {
    this.#subscriptions.forEach((s) => s.unsubscribe());
  }

  onLoadingThinkerModel(progress: number): void {
    this.loadingProgress.set(progress);
  }

  onLoadModelsComplete(complete: boolean): void {
    if (complete) {
      this.animationTimeLine
        .to('.loader-container > *', {
          opacity: 0,
        })
        .to('.loader-container', { height: 0, duration: 0.5 });
    }

    this.loadingComplete.set(true);
  }
}
