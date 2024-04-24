import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { AppIconComponent } from 'src/app/shared-components/icon/icon.component';
import { IconEnum } from 'src/app/shared-components/icon/icon.enums';

@Component({
  standalone: true,
  selector: 'app-scroll-progressbar',
  templateUrl: './scroll-progressbar.component.html',
  styleUrls: ['./scroll-progressbar.component.scss'],
  imports: [TranslateModule, AppIconComponent],
})
export class ScrollProgressbar implements AfterViewInit {
  @Input() animationTimeLine: gsap.core.Timeline;
  @Input() set loadingComplete(completed: boolean) {
    if (completed) {
      this.animationTimeLine
        .from('.scroll-progressbar', {
          x: -20,
          opacity: 0,
          duration: 0.3,
        })
        .from('.section-title', { x: 15, opacity: 0, stagger: 0.2 });
    }
  }

  IconEnum = IconEnum;

  ngAfterViewInit(): void {
    this.animationTimeLine.add(this.#animateScrollProgressLine());

    // coloring scrolled section title in red
    document.querySelectorAll('section').forEach((_, i) => {
      const currentSection = document.querySelector(`.scrolled-section_${i}`);
      this.animationTimeLine.to(currentSection, {
        immediateRender: false,
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

  #animateScrollProgressLine(): gsap.core.Timeline {
    const sectionsWrapper: HTMLElement =
      document.querySelector('.sections-wrapper');

    return gsap.timeline().to('.scroll-progress-line', {
      immediateRender: false,
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '.soft-skills',
        start: 'top 75%',
        end: () => `${sectionsWrapper.clientHeight * 1.8}`,
        scrub: true,
      },
    });
  }
}
