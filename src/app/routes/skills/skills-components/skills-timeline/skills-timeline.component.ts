import { AfterViewInit, Component, Input } from '@angular/core';
import gsap from 'gsap';
@Component({
  selector: 'app-skills-timeline',
  templateUrl: './skills-timeline.component.html',
  styleUrls: ['./skills-timeline.component.scss'],
  standalone: true,
})
export class SkillsTimelineComponent implements AfterViewInit {
  @Input({ required: true }) scrollableWrapper: HTMLElement;
  @Input({ required: true }) timelineAnimationTrigger: HTMLElement;

  ngAfterViewInit(): void {
    const circles = document.querySelectorAll('circle');
    const animationTimeLine = gsap.timeline({ delay: 0.3 });

    animationTimeLine
      .from(circles, { y: -100, stagger: 0.15 })
      .to('line.line-placeholder', {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'expo',
      });

    const animatedLine = document.querySelector('.animated-line-on-scroll');

    gsap.to(animatedLine, {
      strokeDashoffset: 0,
      // duration: this.scrollTriggerContainer?.element.offsetWidth,
      // duration: 2,
      ease: 'power1',
      scrollTrigger: {
        trigger: this.timelineAnimationTrigger,
        start: 'bottom top',
        scrub: 1,
        markers: true,
        /** adding inertia to progress line
         * Helps to reach the end when horizontal scroll is done
         */
        end: () => this.scrollableWrapper.offsetWidth * 1.9,
      },
    });
  }
}
