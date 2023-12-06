import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  standalone: true,
  selector: 'app-skills-intro-animation',
  templateUrl: './intro-animations.component.html',
  styleUrls: ['./intro-animations.component.scss'],
  imports: [TranslateModule],
})
export class SkillsIntroAnimationComponent implements AfterViewInit {
  startScrollProgressbarIntro = 'scrollProgressbarIntro';

  #animationTimeLine = gsap.timeline({ defaults: { duration: 0.5 } });
  #scrollIconAnimationStart = 'scrollIconAnimationStart'; // animated icon slider&label after positioning start
  #positionBubblesAnimationStart = 'positionBubblesAnimationStart'; // position bubble animation start

  ngAfterViewInit(): void {
    //dispatch bubbles then starts skills intro animation
    this.skillsAnimationsContainerLauncher();
    // animated bubble on skills intro
    this.putTransparentBubbleToPosition();
    this.putColoredBubbleToPosition();
    this.explodeColoredBubble();
  }

  skillsAnimationsContainerLauncher(): void {
    this.#animationTimeLine
      .to('.loader', {
        // launch circular loader
        duration: 1,
        strokeDashoffset: 0,
        opacity: 0,
      })
      .to('.loader', {
        // remove circular loader before bubbles comes in
        display: 'none',
      })
      .to('.bubble', {
        // bubbles rotation
        ease: 'none',
        width: '5rem',
        height: '5rem',
        rotation: 1440,
        duration: 2,
        transform: 'rotate(360deg)',
        scale: '+=0.7',
        autoAlpha: 0.5,
      });
  }
  // rendering animated scroll icon
  putTransparentBubbleToPosition(): void {
    this.#animationTimeLine
      .to(
        '.bubble.transparent',
        {
          top: '89%',
          left: '6rem',
          borderRadius: '3rem',
          width: '1.5rem',
          height: '3rem',
          autoAlpha: 1,
        },
        this.#positionBubblesAnimationStart
      )
      .to(
        '.scroll-icon-label',
        {
          y: 20,
          opacity: 1,
          duration: 1,
          ease: 'elastic',
        },
        this.#scrollIconAnimationStart
      )
      .from(
        '.slider',
        {
          opacity: 0,
          y: -5,
        },
        this.#scrollIconAnimationStart
      );
  }
  // bubble to explode
  putColoredBubbleToPosition(): void {
    this.#animationTimeLine.to(
      '.bubble.colored',
      {
        top: '9rem',
        left: '1rem',
        width: '15rem',
        height: '15rem',
        opacity: 0.5,
      },
      this.#positionBubblesAnimationStart
    );
  }
  // explode colored bubble then splash
  explodeColoredBubble() {
    this.#animationTimeLine
      .to('.bubble.colored', {
        scale: 2,
        repeat: 1,
        ease: 'elastic',
      })
      .to('.bubble.colored', { display: 'none' })
      .to('.splash-img', { autoAlpha: 0.7, scale: 1.4, ease: 'elastic' });
  }
}
