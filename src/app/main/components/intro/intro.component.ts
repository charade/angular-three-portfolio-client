import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { IntroUtils } from './utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule],
})
export class IntroComponent implements AfterViewInit {
  @Input() animateTimeline: gsap.core.Timeline;

  @Input() set modelsLoadingComplete(complete: boolean) {
    if (complete) {
      this.#enteringIntroSectionSocialMediaAnimation();
    }
  }

  IntroUtils = IntroUtils;

  ngAfterViewInit(): void {
    this.#exitingIntroCatchPhraseAnimation();
    this.#exitingIntroSectionSocialMediaAnimation();
  }

  #enteringIntroSectionSocialMediaAnimation() {
    this.animateTimeline.from(
      '.social-medias-link',
      {
        x: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.4,
      },
      '-=1.1'
    );
  }

  #exitingIntroSectionSocialMediaAnimation() {
    gsap.to('.social-medias-link', {
      immediateRender: false,
      y: -100,
      opacity: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.fake-section',
        start: 'top 20%',
        end: 'top 20%',
        scrub: 2,
      },
    });
  }

  #exitingIntroCatchPhraseAnimation() {
    gsap.to('.intro-text', {
      stagger: 0.3,
      opacity: 0,
      y: -25,
      scrollTrigger: {
        trigger: '.fake-section',
        start: 'top 20%',
        end: 'top 20%',
        scrub: 2,
      },
    });
  }
}
