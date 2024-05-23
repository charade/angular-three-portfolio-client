import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { MediaBreakPointsObserver } from 'src/app/shared-components/media-breakpoints-observer';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent
  extends MediaBreakPointsObserver
  implements AfterViewInit
{
  ngAfterViewInit(): void {
    gsap
      .timeline({
        immediateRender: false,
        scrollTrigger: {
          trigger: 'section.projects',
          start: 'top 65%',
          end: 'top 65%',
          scrub: 2,
        },
      })
      .from('.project', { opacity: 0, width: 0 })
      .from('.project > h4', { opacity: 0, y: 30, stagger: 0.4 });

    gsap.to('.projects-container', {
      x: -50,
      opacity: 0,
      scrollTrigger: {
        trigger: 'section.projects',
        start: 'top 10%',
        end: 'top 10%',
        scrub: 2,
      },
    });
  }
}