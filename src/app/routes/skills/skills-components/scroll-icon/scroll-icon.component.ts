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
        position: 'fixed',
        top: '88%',
        left: '4rem',
        borderRadius: '3rem',
        width: '2rem',
        height: '4rem',
        ease: 'sin',
        border: '2px solid',
        duration: 1,
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
