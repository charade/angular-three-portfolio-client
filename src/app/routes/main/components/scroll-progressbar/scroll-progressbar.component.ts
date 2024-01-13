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
  ngAfterViewInit(): void {
    const firstSection = document.querySelector('section');
    const sectionsWrapper: HTMLElement =
      document.querySelector('.sections-wrapper');

    gsap.to('.filled-line', {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: firstSection,
        scrub: true,
        start: 'top 75%',
        end: `${sectionsWrapper.clientHeight * 2.3}`,
        markers: true,
      },
    });
  }
}
