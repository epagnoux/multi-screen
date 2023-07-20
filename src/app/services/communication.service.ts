import { BehaviorSubject } from 'rxjs';
import { BroadcastChannelModel } from '../models/broadcast-channel.model';
import { CommunicationMessage } from '../models/communication-message.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  items: BroadcastChannelModel[] = [];

  public message: CommunicationMessage | undefined;
  public message$ = new BehaviorSubject<CommunicationMessage | undefined>(undefined);
  constructor() {}

  postMessage(message: CommunicationMessage) {
    this.postMessageBradcastChannel(message);

    this.message = message;
    this.message$.next(this.message);
  }
  postMessageBradcastChannel(message: CommunicationMessage) {
    const item = this.getBroadcastChannel(message.channel);
    item.postMessage(message);
  }

  // setBroadcastChannel(channel: string) {
  //   let item = this.items.find((p) => p.key === channel) as BroadcastChannelModel;

  //   if (!item) {
  //     // Create channel if not exist
  //     const broadcastChannel = new BroadcastChannel(channel);
  //     item = new BroadcastChannelModel(channel, broadcastChannel);
  //     this.items.push(item);
  //   }
  //   return item;
  // }

  getBroadcastChannel(channel: string) {
    //    return this.items.find((p) => p.key === channel)?.broadcastChannel as BroadcastChannel;
    let item = this.items.find((p) => p.key === channel) as BroadcastChannelModel;

    if (!item) {
      // Create channel if not exist
      const broadcastChannel = new BroadcastChannel(channel);
      item = new BroadcastChannelModel(channel, broadcastChannel);
      this.items.push(item);
    }
    return item.broadcastChannel;
  }
}
