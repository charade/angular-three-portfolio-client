import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsTemplateComponent } from 'src/app/main/components/projects/projects-details/project-details-template/project-details-template';

@Component({
  selector: 'app-memo-details',
  standalone: true,
  imports: [CommonModule, ProjectDetailsTemplateComponent],
  templateUrl: './memo-details.component.html',
  styleUrls: ['./memo-details.component.scss'],
})
export class MemoDetailsComponent {
  readonly carousselImages = [
    '/assets/portffolio-screenshots/memo-screenshots/memo-home-page.png',
    '/assets/portffolio-screenshots/memo-screenshots/memo-search-page.png',
    '/assets/portffolio-screenshots/memo-screenshots/memo-map-create-page-.png',
    '/assets/portffolio-screenshots/memo-screenshots/memo-create-page.png',
    '/assets/portffolio-screenshots/memo-screenshots/memo-list-page.png',
    '/assets/portffolio-screenshots/memo-screenshots/memo-overview-page.png',
  ];

  readonly description =
    'An Ionic7/Angular17 mobile app for saving memories. Attaching a memory to a location, with comments. Memories are grouped into categories, this way user can remember a place linking it to a feeling. First user select a location, then attach create memory by adding a category and a comment. Once saved he can check the memories list and check their details.';
}
