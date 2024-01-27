import { AfterViewInit, Component } from '@angular/core';
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
  ngAfterViewInit(): void {
    this.#animateHardSkillsWorkFlow();
    this.#animateHardSkillsStacks();
    this.#animateHardSkillsSubSectionsSeparator();
  }

  #animateHardSkillsWorkFlow() {
    const splitedTitle = new SplitType('.workflow > h3', { types: 'chars' });

    gsap
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

  #animateHardSkillsSubSectionsSeparator() {
    gsap.from('.separator', {
      opacity: 0,
      height: 0,
      scrollTrigger: {
        trigger: 'section.hard-skills',
        start: 'top 30.5%',
        end: 'bottom bottom',
        scrub: 3,
      },
    });
  }

  #animateHardSkillsStacks() {
    const splitedTitle = new SplitType('.stack > h3', { types: 'chars' });

    gsap
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
        stagger: 0.5,
        x: -30,
      })
      .from('.stack > ul', {
        opacity: 0,
        y: 100,
      });
  }
}
