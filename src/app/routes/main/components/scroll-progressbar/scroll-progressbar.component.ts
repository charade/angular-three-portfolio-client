import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  standalone: true,
  selector: 'app-scroll-progressbar',
  templateUrl: './scroll-progressbar.component.html',
  styleUrls: ['./scroll-progressbar.component.scss'],
  imports: [TranslateModule],
})
export class ScrollProgressbar implements AfterViewInit {
  @Input() mainTimelineAnimation: gsap.core.Timeline;
  @Input() set loadingComplete(completed: boolean) {
    if (completed) {
      this.mainTimelineAnimation
        .from('.scroll-progressbar', {
          x: -20,
          opacity: 0,
          duration: 0.3,
        })
        .from('.section-title', { x: 15, opacity: 0, stagger: 0.2 });
    }
  }

  ngAfterViewInit(): void {
    const sectionsWrapper: HTMLElement =
      document.querySelector('.sections-wrapper');

    gsap.to('.scroll-progress-line', {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '.soft-skills',
        scrub: true,
        start: 'top 75%',
        end: `${sectionsWrapper.clientHeight * 2}`,
      },
    });

    document.querySelectorAll('section.scrollable').forEach((_, i) => {
      const currentSection = document.querySelector(`.scrolled-section_${i}`);
      gsap.to(currentSection, {
        scrollTrigger: {
          trigger: `.section_${i}`,
          start: 'top 75%',
          end: 'bottom 75%',
          onEnter: () => currentSection.classList.add('current'),
          onLeave: () => currentSection.classList.remove('current'),
          onEnterBack: () => currentSection.classList.add('current'),
          onLeaveBack: () => currentSection.classList.remove('current'),
          scrub: true,
        },
      });
    });
  }
}
