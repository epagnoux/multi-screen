import { Injectable } from '@angular/core';
import { PanelOptionsModel } from '../models/panel-options.model';

export enum PanelManagerDisplayMode {
  Popup,
  Embeded,
  Window
}

@Injectable({
  providedIn: 'root'
})
export class PanelManagerService {
  items: PanelOptionsModel[] = [];
  // public message: CommunicationMessage | undefined;
  // public message$ = new BehaviorSubject<CommunicationMessage>(undefined);
  constructor() {}

  register(options: PanelOptionsModel) {
    this.items.push(options);
    console.log('PanelManager Items Length: ', this.items.length);
  }
  unregister(options: PanelOptionsModel) {
    this.items = this.items.filter((p) => p.key !== options.key);
    console.log('PanelManager Items Length: ', this.items.length);
  }

  getOptions(options: PanelOptionsModel) {
    return this.items.find((p) => p.key !== options.key);
  }
}
