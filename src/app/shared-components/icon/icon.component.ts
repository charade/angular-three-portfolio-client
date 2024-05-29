import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import { IconEnum } from './icon.enums';

@Component({
  standalone: true,
  templateUrl: './icon.component.html',
  selector: 'app-icon',
  styleUrls: ['./icon.component.scss'],
  imports: [FontAwesomeModule, NgIf],
})
export class AppIconComponent {
  @Input({ required: true }) iconName: IconEnum;
  @Input() strokeColor: string = '';
  @Output() action = new EventEmitter<HTMLElement>();
  IconEnum = IconEnum;
}
