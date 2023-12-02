import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollIconComponent } from './skills-components/skills-background/scroll-icon.component';
import { SkillsTimelineComponent } from './skills-components/skills-timeline/skills-timeline.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [TranslateModule, ScrollIconComponent, SkillsTimelineComponent],
})
export class SkillsComponent {}
