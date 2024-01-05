import { AfterViewInit, Component, Input } from '@angular/core';
import gsap from 'gsap';

@Component({
  standalone: true,
  selector: 'app-scroll-progressbar',
  templateUrl: './scroll-progressbar.component.html',
  styleUrls: ['./scroll-progressbar.component.scss'],
})
export class SkillsScrollProgressbar implements AfterViewInit {
  @Input({ required: true }) scrollableWrapper: HTMLElement;
  @Input({ required: true }) timelineAnimationTrigger: HTMLElement;
  @Input() animationTimeline: gsap.core.Timeline

  ngAfterViewInit(): void {
    const circles = document.querySelectorAll('.progress-check-point');
    this.animationTimeline
      .from(circles, { x: -150, stagger: 0.15, opacity: 0 })
      .to('line.line-placeholder', {
        strokeDashoffset: 0,
        duration: 1,
      });

    const animatedLine = document.querySelector('.animated-line-on-scroll');
    gsap.to(animatedLine, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: this.timelineAnimationTrigger,
        start: 'top top',
        scrub: 1,
        /** adding inertia to progress line
         * Helps to reach the end when horizontal scroll is done
         */
        end: () => this.scrollableWrapper.offsetWidth,
      },
    });
  }
}
