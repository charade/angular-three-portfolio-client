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
    const container = document.querySelector('.container');
    const slider = document.querySelector('.slider');
    const label = document.querySelector('.label');

    animationTimeLine
      .to(container, {
        left: '50%',
        top: '50%',
        borderRadius: '3rem',
        width: '2rem',
        height: '4rem',
        ease: 'sin',
        border: '2px solid',
      })
      .to(container, {
        left: '3rem',
        top: '88%',
      })
      .to(label, { y: 27, opacity: 1, duration: 1, ease: 'elastic' })
      .to(slider, {
        opacity: 1,
        keyframes: [{ y: -1 }, { y: 5 }, { y: -1 }],
        repeat: 1,
      });
  }
}
