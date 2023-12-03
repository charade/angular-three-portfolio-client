import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  selector: 'app-scroll-icon',
  templateUrl: './scroll-icon.component.html',
  styleUrls: ['./scroll-icon.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class ScrollIconComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const animationTimeLine = gsap.timeline();
    animationTimeLine
      .to('.scroll-icon-container', {
        left: '50%',
        top: '50%',
        borderRadius: '3rem',
        width: '2rem',
        height: '4rem',
        ease: 'sin',
        border: '2px solid',
      })
      .to('.scroll-icon-container', {
        left: '3rem',
        top: '88%',
        position: 'fixed',
      })
      .to('.scroll-icon-label', {
        y: 27,
        opacity: 1,
        duration: 1,
        ease: 'elastic',
      })
      .to('.slider', {
        opacity: 1,
        keyframes: [{ y: -1 }, { y: 5 }, { y: -1 }],
        repeat: 1,
      });
  }
}
