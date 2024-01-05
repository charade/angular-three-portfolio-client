import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

import { SkillsScrollProgressbar } from './components/scroll-progressbar/scroll-progressbar.component';
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
    SkillsScrollProgressbar,
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
  #cd = inject(ChangeDetectorRef);
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
    this.#initHorizontalScrollableContainer();
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
      gsap
        .timeline()
        .to('.loader-container', { opacity: 0, duration: 0.5 })
        .to('.loader-container', { x: -300 })
        .from('.intro-text', {
          stagger: 0.2,
          x: 20,
          scale: 5,
          opacity: 0,
          duration: 0.8,
        });
    }
  }

  // set main wrapper horizontal scroll
  #initHorizontalScrollableContainer(): void {
    const scrolledSections: HTMLElement[] = Array.from(
      document.querySelectorAll('section')
    );

    const scrollableWrapper: HTMLDivElement =
      document.querySelector('.scroll-wrapper');

    gsap.to(scrolledSections, {
      xPercent: -100 * (scrolledSections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scrollableWrapper,
        pin: true,
        scrub: true,
        markers: true,
        start: 'top top',
        // defining horizontal scroll end to depend on scroll wrapper.scrollHeight
        end: () => `+=${scrollableWrapper.offsetWidth}`,
      },
    });
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
          // containerAnimation: this.animationTimeLine,
          start: '70% top',
          end: '80% top',
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
          start: '70% top',
          end: '80% top',
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
          start: '70% top',
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
