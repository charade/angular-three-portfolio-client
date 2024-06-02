import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export type MessageType = { email: string; text: string };
@Injectable()
export class MessageService {
  #http = inject(HttpClient);

  sendMessage(message: MessageType) {
    return this.#http.post(
      'https://angular-portfolio-back-end.vercel.app/api/message',
      message
    );
  }
}
