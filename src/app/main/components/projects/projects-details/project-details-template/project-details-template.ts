import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIconComponent } from '../../../../../shared-components/icon/icon.component';
import { IconEnum } from '../../../../../shared-components/icon/icon.enums';
import { OVERLAY_DATA_TOKEN } from 'src/app/main/services/overlay/overlay.service';

@Component({
  selector: 'project-details-template',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  templateUrl: './project-details-template.html',
  styleUrls: ['./project-details-template.scss'],
})
export class ProjectDetailsTemplateComponent {
  @Input() images: string[];
  @Input() description: string;
  @Input() link: string;

  overlayData = inject(OVERLAY_DATA_TOKEN);

  IconEnum = IconEnum;
}
