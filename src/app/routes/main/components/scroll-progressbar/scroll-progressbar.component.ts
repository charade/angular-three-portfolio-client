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
    const sections = document.querySelectorAll('section');

    sections.forEach((section, i) => {
      gsap.to('.scrolled-line', {
        top: `+=${11}rem`,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: () => `+=top top`,
        },
      });
    });
  }
}
