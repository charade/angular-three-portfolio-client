import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {
  @Input() animationTimeLine: gsap.core.Timeline;
  ngAfterViewInit(): void {
    const projectTimeline = gsap
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

    this.animationTimeLine.add(projectTimeline);
  }
}
