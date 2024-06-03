import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsTemplateComponent } from 'src/app/main/components/projects/projects-details/project-details-template/project-details-template';

@Component({
  selector: 'app-flex-date-details',
  standalone: true,
  imports: [CommonModule, ProjectDetailsTemplateComponent],
  templateUrl: './flex-date-details.component.html',
  styleUrls: ['./flex-date-details.component.scss'],
})
export class FlexDateDetailsComponent {
  readonly carousselImages = [
    '/assets/portffolio-screenshots/flex-date-screenshots/flex-date-calendar.png',
    '/assets/portffolio-screenshots/flex-date-screenshots/flex-date-settings.png',
    '/assets/portffolio-screenshots/flex-date-screenshots/flex-date-calendar-chinese.png',
  ];

  readonly description =
    "This open design input date component give to users the opportunity to take advantage of dayjs library flexibility. But also includes a translator to get your calendar in your chosen languages. Users can customize the date format. It's implemented with Angular 16";
}
