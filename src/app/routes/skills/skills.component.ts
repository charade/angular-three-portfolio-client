import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillsSectionsComponent } from './skills-components/skills-sections/skills-sections.component';


@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [TranslateModule, SkillsSectionsComponent],
})
export class SkillsComponent {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }
}
