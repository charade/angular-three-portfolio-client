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
import SplitType from 'split-type';

@Component({
  standalone: true,
  selector: 'app-soft-skills',
  templateUrl: './skills-sections.component.html',
  styleUrls: ['./skills-sections.component.scss'],
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
export class SkillsSectionsComponent
  implements AfterViewInit, OnInit, OnDestroy
{
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
    this.#animateSkillSectionTitle(tweenScrollableContainer);
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
        scrub: true,
        // defining horizontal scroll end to depend on scroll wrapper.scrollHeight
        end: () => `+=${scrollableWrapper.offsetWidth}`,
      },
    });

    this.#cd.detectChanges();

    return scrollableContainer;
  }
  // animate first content on entering route
  #animateIntroSection(): void {
    gsap.from('.skills-intro', {
      delay: 4.75,
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic',
    });
  }

  #initSofSkillsSection(tweenScrollableContainer: gsap.core.Tween): void {
    gsap
      .timeline()
      .from('.soft-skills-subtitle', {
        // animated underline
        width: 0,
        duration: 4,
        stagger: 0.5,
        scrollTrigger: {
          trigger: '.soft-skills',
          scrub: true,
          containerAnimation: tweenScrollableContainer,
          start: 'left 48%',
          end: '45% center',
        },
      })
      .from('.soft-skills-subtitle-content', {
        // animated skill text content
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.8,
        scrollTrigger: {
          trigger: '.soft-skills-subtitle-content',
          scrub: true,
          containerAnimation: tweenScrollableContainer,
          start: 'left 48%',
          end: '45% center',
        },
      });
  }

  #animateSkillSectionTitle(tweenScrollableContainer: gsap.core.Tween): void {
    const skillsSectionsTitle = document.querySelectorAll(
      '.animated-chars-title'
    );

    skillsSectionsTitle.forEach((title) => {
      console.log(title);
      const splittedTitle = new SplitType(title as HTMLElement, {
        types: 'chars,words',
      });

      gsap.to(splittedTitle.chars, {
        color: '#000',
        stagger: 0.9,
        scale: 1.2,
        scrollTrigger: {
          containerAnimation: tweenScrollableContainer,
          trigger: title,
          scrub: true,
          start: 'left 48%',
          end: 'end 10%',
        },
      });
    });
  }
}
