import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.scss'],
  standalone: true,
})
export class SoftSkillsComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('section');
    const animationTimeLine = gsap.timeline();
    // animate first section enter route
    gsap.from('.enter-section', 0.8, {
      delay: 1,
      x: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'elastic',
    });

    const main = gsap.timeline().to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-wrapper',
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // horizontal scroll ends on reaching the scroll wrapper end
        end: '+=' + document.querySelector('.scroll-wrapper').clientWidth,
      },
    });

    // sections.forEach((section) => {

    // document.querySelectorAll('.animated-content').forEach((animatedC) => {
      const animatedContentTimeline = gsap.timeline({ duration: 5 });

      animatedContentTimeline.fromTo(
        '.animated-content-03',

        {
          opacity: 0,
          y: 100,
          scrollTrigger: {
            trigger: '.animated-content-03',
            //   end: 'top 90%',
            markers: true,
          },
        },
        { opacity: 1, y: 0 }
      );
    // });

    // });
  }
}
