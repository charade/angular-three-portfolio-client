import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'hard-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.scss'],
})
export class HardSkillsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap
      .timeline()
      .from('.workflow', {
        opacity: 0,
        color: 'blue',
        y: 100,
        // immediateRender: false,
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top center',
          end: 'top 45%',
          scrub: 2,
        },
      })
      .from('.stack', {
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top 40%',
          end: 'top 30%',
          scrub: 2,
        },
      });
  }
}
