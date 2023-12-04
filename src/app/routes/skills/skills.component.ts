import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ScrollIconComponent } from './skills-components/scroll-icon/scroll-icon.component';
import { SoftSkillsComponent } from './skills-components/soft-skills/soft-skills.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [TranslateModule, ScrollIconComponent, SoftSkillsComponent],
})
export class SkillsComponent {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }
}
