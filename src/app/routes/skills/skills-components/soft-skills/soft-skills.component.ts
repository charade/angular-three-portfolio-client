import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import gsap from 'gsap';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsIntroAnimationComponent } from '../intro-animation/intro-animations.component';
import { SkillsScrollProgressbar } from '../scroll-progressbar/scroll-progressbar.component';

@Component({
  standalone: true,
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  imports: [
    TranslateModule,
    SkillsIntroAnimationComponent,
    SkillsScrollProgressbar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftSkillsComponent implements AfterViewInit {
  #cd = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const sections = Array.from(document.querySelectorAll('section'));
    const tweenScrollableContainer = this.#initScrollableContainer(sections);
    this.#animateFirstContent();
    this.#initAnimatedScrolledContent(tweenScrollableContainer);
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
      delay: 5,
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
        ease: 'circ',
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
