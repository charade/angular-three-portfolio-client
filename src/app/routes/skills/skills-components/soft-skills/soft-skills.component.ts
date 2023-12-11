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
import gsap from 'gsap';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
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

  ngOnInit(): void {
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
    this.#animateFirstContent();
    this.#initAnimatedScrolledContent(tweenScrollableContainer);
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
  #animateFirstContent(): void {
    gsap.from('.skills-intro', {
      delay: 5.5,
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic',
    });
  }
  // animate content on scroll
  #initAnimatedScrolledContent(
    tweenScrollableContainer: gsap.core.Tween
  ): void {
    document.querySelectorAll('.animated-content').forEach((content, index) => {
      gsap.from(content, {
        opacity: 0,
        // alternate content entering viewport animation from top/bottom
        y: index % 2 ? -60 : 60,
        duration: 0.1,
        ease: 'elastic',
        scrollTrigger: {
          // animation triggered when parent section hits 70% of the viewport width
          trigger: content.parentElement,
          scrub: 1,
          containerAnimation: tweenScrollableContainer,
          start: `left 60%`,
        },
      });
    });
  }
}
