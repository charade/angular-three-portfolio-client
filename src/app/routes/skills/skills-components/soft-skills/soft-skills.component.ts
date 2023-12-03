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

    const timeline = gsap.timeline();
    const sections = gsap.utils.toArray('section');

    timeline.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'ease.inOut',
      scrollTrigger: {
        trigger: '.scroll-wrapper',
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: '+=3000',
      },
    });
  }
}
