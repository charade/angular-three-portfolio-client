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
  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;

  ngAfterViewInit(): void {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.soft-skills',
          start: 'top 32%',
          end: 'top 32%',
          scrub: 1.5,
        },
      })
      .from('.soft-skills-catch-phrase-container', { opacity: 0, height: 0 }) // red border left animation
      .from('.soft-skills-catch-phrase', { opacity: 0, stagger: 0.2, y: 50 });

    gsap.from('.soft-skills-list li', {
      opacity: 0,
      y: 30,
      stagger: 0.4,
      transform: 'rotate(-15deg)',
      scrollTrigger: {
        trigger: '.soft-skills',
        start: 'top 30%',
        end: 'top 30%',
        scrub: 3,
      },
    });

    gsap.to(this.#viewContainerRef, {
      opacity: 0,
      y: '-=50',
      scrollTrigger: {
        trigger: 'section.soft-skills',
        start: 'top 10%',
        end: 'top 10%',
        scrub: 3,
      },
    });
  }
}
