import {
  AfterViewInit,
  Component,
  Input,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  selector: 'soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class SoftSkillsComponent implements AfterViewInit {
  @Input() animationTimeLine: gsap.core.Timeline;

  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;

  ngAfterViewInit(): void {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.soft-skills',
          start: 'top 32%',
          end: 'top 32%',
          scrub: 1.5,
        },
      })
      .from('.soft-skills-catch-phrase-container', { opacity: 0, height: 0 })
      .from('.soft-skills-catch-phrase', { opacity: 0, stagger: 0.2, y: 50 })
      .from('.soft-skills-list li', {
        opacity: 0,
        y: 30,
        stagger: 0.3,
        transform: 'rotate(-15deg)',
        scrollTrigger: {
          trigger: '.soft-skills',
          start: 'top 10%',
          end: 'top 10%',
          scrub: 2,
        },
      })
      .to(this.#viewContainerRef, {
        opacity: 0,
        y: '-=50',
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top 85%',
          end: 'top 80%',
          scrub: 3,
        },
      });

    this.animationTimeLine.add(tl);
  }
}
