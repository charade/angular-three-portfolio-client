import { AfterViewInit, Component } from '@angular/core';
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
  ngAfterViewInit(): void {
    const softSkillsAnimationTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.soft-skills',
          start: 'top 32%',
          end: 'top 32%',
          scrub: 2,
        },
      })
      .from('.soft-skills-catch-phrase-container', { opacity: 0, height: 0 })
      .from(
        '.soft-skills-catch-phrase',
        { opacity: 0, stagger: 0.3, y: 50 },
        '+=0.3'
      );

    softSkillsAnimationTimeline.from('.soft-skills-list li', {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      ease: 'sine',
      transform: 'rotate(-15deg)',
      scrollTrigger: {
        trigger: '.soft-skills',
        start: 'top 10%',
        end: 'top 10%',
        scrub: 2,
      },
    });

    softSkillsAnimationTimeline.to('.soft-skills-catch-phrase-container', {
      y: 50,
      scrollTrigger: {
        trigger: '.soft-skills',
        start: 'top 5%',
        end: 'top top',
        scrub: 2,
      },
    });
  }
}
