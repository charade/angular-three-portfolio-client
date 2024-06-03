import { AfterViewInit, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import gsap from 'gsap';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { MediaBreakPointsObserver } from 'src/app/shared-components/media-breakpoints-observer';
import { MessageService } from 'src/app/services/message.service';
import { EMPTY, catchError, map } from 'rxjs';
import { IconEnum } from 'src/app/shared-components/icon/icon.enums';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterTypeEnum } from './utils';

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
  IconEnum = IconEnum;

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
            this.#displayMessageSubmitionToaster(
              'message successfully sent',
              200
            );
            form.resetForm();
          }),
          catchError((error: HttpErrorResponse) => {
            this.#displayMessageSubmitionToaster(
              error.status === 400
                ? 'Your email is not valid'
                : 'Oops a server error occurred'
            );
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  #displayMessageSubmitionToaster(
    message: string,
    responseStatus?: number
  ): void {
    const toasterContainer = document.querySelector(
      '.message-toaster-container'
    );

    toasterContainer.textContent = message;
    toasterContainer.classList.add(
      responseStatus === 200 ? ToasterTypeEnum.SUCCESS : ToasterTypeEnum.ERROR
    );

    gsap
      .timeline()
      .from(toasterContainer, { display: 'none' })
      .to(toasterContainer, {
        immediateRender: false,
        opacity: 1,
        duration: 0.5,
      })
      .to(toasterContainer, {
        immediateRender: false,
        delay: 2.75,
        opacity: 0,
      });
  }
}
