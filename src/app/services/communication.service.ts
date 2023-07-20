import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommunicationMessage } from '../models/communication-message.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public message: CommunicationMessage | undefined;
  public message$ = new BehaviorSubject<CommunicationMessage>(undefined);
  constructor() {}

  postMessage(infos: CommunicationMessage) {
    this.message = infos;
    this.message$.next(this.message);
  }

  // receiveMessage(infos: CommunicationMessage) {
  //   this.receiveMessage = infos;
  //   this.message$.next(this.message);
  // }
}
