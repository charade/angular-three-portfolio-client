import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import { IconEnum } from './icon.enums';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
})
export class AppIconComponent {
  @Input({ required: true }) iconName: IconEnum;
  @Input() strokeColor: string = '';
  @Input() clickable = true;
  @Output() action = new EventEmitter<HTMLElement>();
  IconEnum = IconEnum;
}
