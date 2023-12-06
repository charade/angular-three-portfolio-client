import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, TranslateModule],
})
export class ButtonGroupComponent<T> implements OnInit {
  @Input({ required: true }) items: { value: T; label?: string }[] = [];
  @Input() disabled = false;
  selectedItem: WritableSignal<T | null> = signal(null);

  @Output() valueChanged = new EventEmitter<T>();

  ngOnInit(): void {
    this.selectedItem.set(this.items[0]?.value);
    computed(() => this.valueChanged.emit(this.selectedItem()));
  }
  selectItem(value: T) {
    this.selectedItem.set(value);
    this.valueChanged.emit(value);
  }
}
