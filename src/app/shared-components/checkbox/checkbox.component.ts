import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppIconComponent } from '../icon/icon.component';
import { IconEnum } from '../icon/icon.enums';

@Component({
  standalone: true,
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  imports: [NgIf, AppIconComponent],
})
export class CheckboxComponent {
  @Input() label: string;
  @Output() valueChanged = new EventEmitter<boolean>();
  icon = IconEnum.Check;
}
