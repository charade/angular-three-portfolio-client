import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import gsap from 'gsap';
import { SkillsTimelineComponent } from '../skills-timeline/skills-timeline.component';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  standalone: true,
  imports: [SkillsTimelineComponent],
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
  #initScrollableContainer(scrolledSection: HTMLElement[]): gsap.core.Tween {
    const scrollableContainer = gsap.to(scrolledSection, {
      xPercent: -100 * (scrolledSection.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-wrapper',
        pin: true,
        scrub: 1,
        snap: 1 / (scrolledSection.length - 1),
        // defining horizontal scroll to depend on scroll wrapper.scrollHeight
        end: `+=${document.querySelector('.scroll-wrapper').clientWidth + 800}`,
      },
    });

    this.#cd.detectChanges();

    return scrollableContainer;
  }

  // animate first content on entering route
  #animateFirstContent(): void {
    gsap.from('.first-animated-content', {
      delay: 1,
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'sin',
    });
  }

  // animate content on scroll
  #initAnimatedScrolledContent(
    tweenScrollableContainer: gsap.core.Tween
  ): void {
    document.querySelectorAll('.animated-content').forEach((content) => {
      gsap.from(content, {
        opacity: 0,
        // alternate content entering viewport animation from top/bottom
        y: 70,
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
