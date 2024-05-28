import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIconComponent } from '../../../../../shared-components/icon/icon.component';
import { IconEnum } from '../../../../../shared-components/icon/icon.enums';

@Component({
  selector: 'project-details-template',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  templateUrl: './project-details-template.html',
  styleUrls: ['./project-details-template.scss'],
})
export class ProjectDetailsTemplateComponent {
  @Input() title: string;
  @Input() images: string[];
  @Input() description: string;
  @Input() link: string;
  IconEnum = IconEnum;
}
