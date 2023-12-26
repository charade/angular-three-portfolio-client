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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import gsap from 'gsap';

import { SkillsIntroAnimationComponent } from '../intro-animation/intro-animations.component';
import { SkillsScrollProgressbar } from '../scroll-progressbar/scroll-progressbar.component';
import { ButterfliesComponent } from './three/butterflies.component';

@Component({
  standalone: true,
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  imports: [
    TranslateModule,
    SkillsIntroAnimationComponent,
    SkillsScrollProgressbar,
    NgClass,
    ButterfliesComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftSkillsComponent implements AfterViewInit, OnInit, OnDestroy {
  isDeviceHandset: WritableSignal<boolean> = signal(false);
  isDeviceS: WritableSignal<boolean> = signal(false);
  isDeviceTabletLandscape: WritableSignal<boolean> = signal(false);
  isDeviceSm: WritableSignal<boolean> = signal(false);
  isDeviceM: WritableSignal<boolean> = signal(false);
  isDeviceL: WritableSignal<boolean> = signal(false);
  isDeviceXL: WritableSignal<boolean> = signal(false);

  #mediaSizeObserver = inject(BreakpointObserver);
  #cd = inject(ChangeDetectorRef);
  #subscriptions: Subscription[] = [];
  #translate = inject(TranslateService);

  ngOnInit(): void {
    console.log(this.#translate.get('skills.agile.title'));

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
    const sections = Array.from(document.querySelectorAll('section'));
    const tweenScrollableContainer = this.#initScrollableContainer(sections);
    this.#animateIntroSection();
    this.#initSofSkillsSection(tweenScrollableContainer);
  }

  ngOnDestroy(): void {
    this.#subscriptions.forEach((s) => s.unsubscribe());
  }
  // set main wrapper horizontal scroll
  #initScrollableContainer(scrolledSections: HTMLElement[]): gsap.core.Tween {
    const scrollableWrapper: HTMLDivElement =
      document.querySelector('.scroll-wrapper');

    const scrollableContainer = gsap.to(scrolledSections, {
      xPercent: -100 * (scrolledSections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scrollableWrapper,
        pin: true,
        scrub: 1,
        // defining horizontal scroll to depend on scroll wrapper.scrollHeight
        end: () => `+=${scrollableWrapper.offsetWidth}`,
      },
    });

    this.#cd.detectChanges();

    return scrollableContainer;
  }
  // animate first content on entering route
  #animateIntroSection(): void {
    gsap.from('.skills-intro', {
      delay: 5.5,
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic',
    });
  }

  #initSofSkillsSection(tweenScrollableContainer: gsap.core.Tween): void {
    gsap.from('.soft-skills-subtitle', {
      width: 0,
      duration: 0.9,
      stagger: 0.5,
      scrollTrigger: {
        trigger: '.soft-skills',
        scrub: true,
        containerAnimation: tweenScrollableContainer,
        start: 'left 45%',
        end: '20% center',
      },
    });

    gsap.from('.soft-skills-subtitle-content', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.6,
      scrollTrigger: {
        trigger: '.soft-skills-subtitle-content',
        scrub: true,
        containerAnimation: tweenScrollableContainer,
        start: 'left 48%',
        end: '45% center',
      },
    });
  }
}
