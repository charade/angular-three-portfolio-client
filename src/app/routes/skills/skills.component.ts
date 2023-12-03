import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ScrollIconComponent } from './skills-components/scroll-icon/scroll-icon.component';
import { SkillsTimelineComponent } from './skills-components/skills-timeline/skills-timeline.component';
import { SoftSkillsComponent } from './skills-components/soft-skills/soft-skills.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    ScrollIconComponent,
    SkillsTimelineComponent,
    SoftSkillsComponent,
  ],
})
export class SkillsComponent {}
