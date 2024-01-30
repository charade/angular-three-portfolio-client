import { AfterViewInit, Component, Input } from '@angular/core';
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
  @Input() animationTimeLine: gsap.core.Timeline;

  ngAfterViewInit(): void {
    this.animationTimeLine.add(
      gsap.timeline().to('.intro-text', {
        stagger: 0.3,
        opacity: 0,
        y: -25,
        scrollTrigger: {
          trigger: 'section.soft-skills',
          start: 'top 75%',
          end: 'top 75%',
          scrub: 2,
        },
      })
    );
  }
}
