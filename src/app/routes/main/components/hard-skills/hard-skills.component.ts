import {
  AfterViewInit,
  Component,
  Input,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import SplitType from 'split-type';

@Component({
  selector: 'hard-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.scss'],
})
export class HardSkillsComponent implements AfterViewInit {
  @Input() animationTimeLine: gsap.core.Timeline;
  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;

  ngAfterViewInit(): void {
    this.animationTimeLine.add(this.#animateHardSkillsWorkFlow());
    this.animationTimeLine.add(this.#animateHardSkillsStacks());
    this.animationTimeLine.add(this.#animateHardSkillsSubSectionsSeparator());
    this.animationTimeLine.add(this.#animateHardSkillsQuit());
  }

  #animateHardSkillsWorkFlow(): gsap.core.Timeline {
    const splitedTitle = new SplitType('.workflow > h3', { types: 'chars' });

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top center',
          end: 'top center',
          scrub: 3,
        },
      })
      .from(splitedTitle.chars, {
        opacity: 0,
        y: 70,
        x: -30,
        scale: 3,
        stagger: 0.5,
      })
      .from('.workflow > ul', {
        opacity: 0,
        y: 100,
      });
  }

  #animateHardSkillsSubSectionsSeparator(): gsap.core.Timeline {
    return gsap.timeline().from('.separator', {
      opacity: 0,
      height: 0,
      scrollTrigger: {
        trigger: 'section.hard-skills',
        start: 'top 31%',
        end: 'bottom bottom',
        scrub: 3,
      },
    });
  }

  #animateHardSkillsStacks(): gsap.core.Timeline {
    const splitedTitle = new SplitType('.stack > h3', { types: 'chars' });

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top 38%',
          end: 'top 38%',
          scrub: 3,
        },
      })
      .from(splitedTitle.chars, {
        opacity: 0,
        y: 70,
        transform: 'rotate(45deg)',
        scale: 3,
        stagger: 0.8,
        x: -30,
      })
      .from('.stack > ul', {
        opacity: 0,
        y: 100,
      });
  }

  #animateHardSkillsQuit(): gsap.core.Timeline {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: 'section.projects',
          start: 'top 78%',
          end: 'top 75%',
          scrub: 3,
        },
      })
      .to(this.#viewContainerRef, { opacity: 0, y: 100 });
  }
}
