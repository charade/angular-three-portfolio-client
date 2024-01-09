import {
  AfterViewInit,
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
import SplitType from 'split-type';

import { ScrollProgressbar } from './components/scroll-progressbar/scroll-progressbar.component';
import { ThinkerModelComponent } from './components/three/thinker.component';
import { AppIconComponent } from 'src/app/shared-components/icon/icon.component';
import { IconEnum } from 'src/app/shared-components/icon/icon.enums';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    TranslateModule,
    ScrollProgressbar,
    NgClass,
    ThinkerModelComponent,
    AsyncPipe,
    AppIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {
  isDeviceHandset: WritableSignal<boolean> = signal(false);
  isDeviceS: WritableSignal<boolean> = signal(false);
  isDeviceTabletLandscape: WritableSignal<boolean> = signal(false);
  isDeviceSm: WritableSignal<boolean> = signal(false);
  isDeviceM: WritableSignal<boolean> = signal(false);
  isDeviceL: WritableSignal<boolean> = signal(false);
  isDeviceXL: WritableSignal<boolean> = signal(false);
  loaderProgress: WritableSignal<number> = signal(0);

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

  ngAfterViewInit(): void {
    this.#initSofSkillsSection();
    this.#animateSkillSectionTitle();
    this.#animateHardSkillsContent();
  }

  ngOnDestroy(): void {
    this.#subscriptions.forEach((s) => s.unsubscribe());
  }

  onLoadingThinkerModel(progress: number): void {
    this.loaderProgress.set(progress);
  }

  onLoadingThinkerModelComplete(complete: boolean): void {
    if (complete) {
      this.animationTimeLine.to('.loader-container', {
        width: 0,
        opacity: 0,
        duration: 0.8,
      });
    }
  }

  #initSofSkillsSection(): void {
    this.animationTimeLine
      .from('.soft-skills-subtitle-content', {
        // animated skill text content
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.8,
        scrollTrigger: {
          trigger: '.soft-skills-subtitle-content',
          scrub: true,
          start: 'top 90%',
          // end: '80% top',
        },
      })
      .from('.soft-skills-subtitle', {
        // animated underline
        width: 0,
        duration: 4,
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.soft-skills',
          scrub: true,
          containerAnimation: this.animationTimeLine,
          start: 'top 90%',
          // end: '80% top',
        },
      });
  }

  #animateSkillSectionTitle(): void {
    const skillsSectionsTitle = document.querySelectorAll(
      '.opacity-animated-title'
    );

    skillsSectionsTitle.forEach((title) => {
      const splittedTitle = new SplitType(title as HTMLElement, {
        types: 'chars,words',
      });

      this.animationTimeLine.to(splittedTitle.chars, {
        color: 'rgba(0, 0, 0, 0.7)',
        stagger: 0.5,
        scrollTrigger: {
          containerAnimation: this.animationTimeLine,
          trigger: title,
          scrub: true,
          start: 'top 90%',
          end: 'end 15%',
        },
      });
    });
  }

  #animateHardSkillsContent(): void {
    gsap
      .timeline({
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.hard-skills-content',
          containerAnimation: this.animationTimeLine,
          scrub: true,
          start: 'left 60%',
          end: '90% 48%',
        },
      })
      .from('.workflow', { y: -50, opacity: 0 })
      .from('.stack', { y: 100, opacity: 0 })
      .from('.projects', { y: 100, opacity: 0 });
  }
}
