import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class IntroComponent implements AfterViewInit {
  constructor() {
    ScrollTrigger.refresh();
  }
  ngAfterViewInit(): void {
    gsap.to('.intro-text', {
      stagger: 0.3,
      opacity: 0,
      y: -25,
      scrollTrigger: {
        trigger: '.fake-section',
        start: 'top 20%',
        end: 'top 20%',
        scrub: 2,
      },
    });
  }
}
