import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SoftSkillsComponent } from './skills-components/soft-skills/soft-skills.component';

@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [TranslateModule, SoftSkillsComponent],
})
export class SkillsComponent {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }
}
