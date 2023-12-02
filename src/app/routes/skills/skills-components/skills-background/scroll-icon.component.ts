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
  @ViewChild('container')
  _container: ElementRef<HTMLDivElement>;

  @ViewChild('slider') _slider: ElementRef<HTMLSpanElement>;

  @ViewChild('label') _label: ElementRef<HTMLSpanElement>;

  #animationTimeLine = gsap.timeline({ duration: 2 });

  ngAfterViewInit(): void {
    const container = this._container.nativeElement;
    const slider = this._slider.nativeElement;
    const label = this._label.nativeElement;

    const scrollerAnimation = this.#animationTimeLine
      .to(container, {
        left: '50%',
        top: '50%',
        borderRadius: '3rem',
        width: '2rem',
        height: '4rem',
        ease: 'bounce.out',
        border: '2px solid',
      })
      .to(container, {
        left: '94.2%',
        top: '88%',
      })
      .to(label, { y: 5, opacity: 1, duration: 1, ease: 'elastic' })
      .to(slider, {
        opacity: 1,
        repeat: 2,
        keyframes: [{ y: 0.5 }, { y: 5 }],
      });
  }
}
