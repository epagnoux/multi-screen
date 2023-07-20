import { BehaviorSubject } from 'rxjs';
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
  public optionsUpdated: PanelOptionsModel | undefined;
  public optionsUpdated$ = new BehaviorSubject<PanelOptionsModel | undefined>(undefined);

  constructor() {}

  register(options: PanelOptionsModel) {
    this.items.push(options);
    console.log('PanelManager Items Length: ', this.items.length);
  }
  unregister(options: PanelOptionsModel) {
    this.items = this.items.filter((p) => p.key !== options.key);
    console.log('PanelManager Items Length: ', this.items.length);
  }

  setOptions(options: PanelOptionsModel) {
    const item = this.items.find((p) => p.key === options.key);
    if (item) {
      item.placement = options.placement;
      this.optionsUpdated = item;
      this.optionsUpdated$.next(this.optionsUpdated);
    }
  }

  getOptions(options: PanelOptionsModel) {
    return this.items.find((p) => p.key === options.key) as PanelOptionsModel;
  }
}
