import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillsTimelineComponent } from '../skills-timeline/skills-timeline.component';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  standalone: true,
  imports: [SkillsTimelineComponent],
})
export class SoftSkillsComponent implements AfterViewInit {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    const sections = Array.from(document.querySelectorAll('section'));
    this.#animateFirstContent();
    const tweenScrollableContainer = this.#initScrollableContainer(sections);
    this.#initAnimatedScrolledContent(tweenScrollableContainer);
  }

  // set main wrapper horizontal scroll
  #initScrollableContainer(scrolledSection: HTMLElement[]): gsap.core.Tween {
    return gsap.to(scrolledSection, {
      xPercent: -100 * (scrolledSection.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-wrapper',
        pin: true,
        scrub: 1,
        snap: 1 / (scrolledSection.length - 1),
        // defining horizontal scroll to depend on scroll wrapper.scrollHeight
        end: `+=${document.querySelector('.scroll-wrapper').clientWidth}`,
      },
    });
  }

  // animate first content on entering route
  #animateFirstContent(): void {
    gsap.from('.first-entering-content', {
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
    document.querySelectorAll('.animated-content').forEach((content, index) => {
      gsap.from(content, {
        opacity: 0,
        // alternate content entering viewport animation from top/bottom
        y: index % 2 ? 200 : -200,
        duration: 3,
        ease: 'elastic',
        scrollTrigger: {
          containerAnimation: tweenScrollableContainer,
          trigger: content.parentElement,
          start: `left 60%`,
        },
      });
    });
  }
}
