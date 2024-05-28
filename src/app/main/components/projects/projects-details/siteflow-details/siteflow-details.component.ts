import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsTemplateComponent } from 'src/app/main/components/projects/projects-details/project-details-template/project-details-template';

@Component({
  selector: 'app-siteflow-details',
  standalone: true,
  imports: [CommonModule, ProjectDetailsTemplateComponent],
  templateUrl: './siteflow-details.component.html',
  styleUrls: ['./siteflow-details.component.scss'],
})
export class SiteflowDetailsComponent {
  readonly carousselImages = [
    '/assets/portffolio-screenshots/siteflow-screenshot/siteflow.png',
  ];

  readonly description =
    'I worked on siteflow solution for the last 2 years as a front-end developer. My mission was to develop new features, correct bugs, writing unit tests, and optimize the front-end solution, be a force for proposals on technical subjects and US improvements , animation of scrum daily meetings in English or French.';
}
