import { BehaviorSubject } from 'rxjs';
import { CommunicationMessage } from '../models/communication-message.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public message: CommunicationMessage | undefined;
  public message$ = new BehaviorSubject<CommunicationMessage | undefined>(undefined);
  constructor() {}

  postMessage(message: CommunicationMessage) {
    this.message = message;
    this.message$.next(this.message);
  }

  // receiveMessage(infos: CommunicationMessage) {
  //   this.receiveMessage = infos;
  //   this.message$.next(this.message);
  // }
}
