import { Component, ElementRef, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  faCircleArrowRight,
  faGlobeAfrica,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio';
  languageIcon = faGlobeAfrica;
  nextIcon = faCircleArrowRight;
}
