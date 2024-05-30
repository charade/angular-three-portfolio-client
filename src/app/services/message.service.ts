import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, catchError, map, tap } from 'rxjs';

export type MessageType = { email: string; text: string };
@Injectable()
export class MessageService {
  #http = inject(HttpClient);

  sendMessage(message: MessageType) {
    console.log(message);
    return this.#http
      .post(
        'https://angular-portfolio-back-end.vercel.app/api/message',
        message
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
