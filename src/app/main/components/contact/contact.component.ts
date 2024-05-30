import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import gsap from 'gsap';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { MediaBreakPointsObserver } from 'src/app/shared-components/media-breakpoints-observer';
import { MessageService } from 'src/app/services/message.service';
import { map } from 'rxjs';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgIf, JsonPipe, NgClass],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent
  extends MediaBreakPointsObserver
  implements AfterViewInit
{
  email = '';
  text = '';

  #messageService = inject(MessageService);

  ngAfterViewInit(): void {
    gsap
      .timeline({
        immediateRender: false,
        scrollTrigger: {
          trigger: 'section.contact',
          start: 'top 75%',
          end: 'top 75%',
          scrub: 2,
        },
      })
      .from('.contact-container', { display: 'none' })
      .from('.outro-container h2:first-child', {
        y: -30,
        opacity: 0,
      })
      .from('.outro-container h2:last-child', {
        y: 30,
        opacity: 0,
      })
      .from('form', { opacity: 0 });
  }

  onsubmit(form: NgForm) {
    if (form.valid) {
      this.#messageService
        .sendMessage({ email: this.email, text: this.text })
        .pipe(
          map(() => {
            form.resetForm();
          })
        )
        .subscribe();
    }
  }
}
