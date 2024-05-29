import {
  AfterViewInit,
  Component,
  Input,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { MediaBreakPointsObserver } from 'src/app/shared-components/media-breakpoints-observer';
import { ProjectsUtils } from './utils';
import { OverlayService } from 'src/app/main/services/overlay/overlay.service';
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
  ProjectUtils = ProjectsUtils;

  #overlayService = inject(OverlayService);
  #viewContainerRef = inject(ViewContainerRef);

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

  onOpenProjectDetails(project: ProjectsUtils.ProjectNameType): void {
    this.#overlayService.open(
      ProjectsUtils.getProjectDetails.value(project),
      this.#viewContainerRef,
      {
        title: project,
        projectLink: ProjectsUtils.getProjectLink.value(project),
      }
    );
  }
}
