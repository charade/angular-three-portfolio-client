import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsTemplateComponent } from 'src/app/main/components/projects/projects-details/project-details-template/project-details-template';

@Component({
  selector: 'app-cryptrends-details',
  standalone: true,
  imports: [CommonModule, ProjectDetailsTemplateComponent],
  templateUrl: './cryptrends-details.component.html',
  styleUrls: ['./cryptrends-details.component.scss'],
})
export class CryptrendsDetailsComponent {
  readonly carousselImages = [
    '/assets/portffolio-screenshots/cryptrends-screenshots/cryptrends-home.png',
    '/assets/portffolio-screenshots/cryptrends-screenshots/cryptrends-details.png',
  ];

  readonly description =
    'Powered by angular 17, i did this project to better understand the world of cryptocurrencies. It allows to track the trends depending on the selected currency. User can check the fluctuation of a crypto as a graph on a details page over the last 30 days.';
}
