import { AfterViewInit, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class IntroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.to('.intro-text', {
      stagger: 0.3,
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: 'section.soft-skills', // soft-skills section
        start: 'top center%',
        end: 'top 40%',
        scrub: 2,
      },
    });
  }
}
