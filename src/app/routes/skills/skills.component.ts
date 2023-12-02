import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollIconComponent } from './skills-components/skills-background/scroll-icon.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [TranslateModule, ScrollIconComponent],
})
export class SkillsComponent {}
