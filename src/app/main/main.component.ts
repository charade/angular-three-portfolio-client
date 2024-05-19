import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgClass } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ScrollProgressbar } from './components/scroll-progressbar/scroll-progressbar.component';
import { CanvasComponent } from './three/canvas.component';
import { AppIconComponent } from 'src/app/shared-components/icon/icon.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';
import { HardSkillsComponent } from './components/hard-skills/hard-skills.component';
import { IntroComponent } from './components/intro/intro.component';

import { RodinThinkerModelService } from './three/services/rodin-thinker';
import { WomanOnStairsModelService } from './three/services/woman-on-stairs';
import { ColumnModelService } from './three/services/column';
import { RedWallModelService } from './three/services/red-wall';

import { IconEnum } from 'src/app/shared-components/icon/icon.enums';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    TranslateModule,
    NgClass,
    AsyncPipe,
    ScrollProgressbar,
    CanvasComponent,
    AppIconComponent,
    IntroComponent,
    SoftSkillsComponent,
    HardSkillsComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  providers: [
    RodinThinkerModelService,
    WomanOnStairsModelService,
    RedWallModelService,
    ColumnModelService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  loadingProgress: WritableSignal<number> = signal(0);
  loadingComplete: WritableSignal<boolean> = signal(false);

  IconEnum = IconEnum;
  animationTimeLine = gsap.timeline();

  onLoadingThinkerModel(progress: number): void {
    this.loadingProgress.set(progress);
  }

  onLoadModelsComplete(complete: boolean): void {
    if (complete) {
      this.animationTimeLine
        .to('.loader-container > *', {
          opacity: 0,
        })
        .to('.loader-container', { width: 0, duration: 0.5 });
    }

    this.loadingComplete.set(true);
  }
}
