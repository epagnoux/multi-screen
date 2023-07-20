import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PanelOptionsModel } from '../models/panel-options.model';
import { PanelPlacement } from '../components/panel-base/panel-base.component';
import { Router } from '@angular/router';
import { RoutingPaths } from '../core/UiEnumerations';

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

  public optionsUpdated: PanelOptionsModel | undefined;
  public optionsUpdated$ = new BehaviorSubject<PanelOptionsModel | undefined>(undefined);

  constructor(private router: Router) {}

  register(options: PanelOptionsModel) {
    // Clone options
    this.items.push({ ...options });
    console.log('PanelManager Items Length: ', this.items.length);
  }
  unregister(options: PanelOptionsModel) {
    this.items = this.items.filter((p) => p.key !== options.key);
    console.log('PanelManager Items Length: ', this.items.length);
  }

  setOptions(windoOptions: PanelOptionsModel) {
    const item = this.items.find((p) => p.key === windoOptions.key);
    if (item) {
      const isFirstOpeneingWindow = windoOptions.placement === PanelPlacement.Window && item.placement !== windoOptions.placement;

      item.placement = windoOptions.placement;
      this.optionsUpdated = item;
      this.optionsUpdated$.next(this.optionsUpdated);

      if (isFirstOpeneingWindow) {
        const routePath = this.router.createUrlTree([`${RoutingPaths.WindowPanel}`]).toString();
        //const routePath = 'http://cnn.com';

        const windowOptions = 'toolbar=0,scrollbars=0,resizable=0,menubar=0,status=0,titlebar=0,width=400,height=400';
        window.open(routePath, '_blank', windowOptions);
      }
    }
  }

  getOptions(options: PanelOptionsModel) {
    return this.items.find((p) => p.key === options.key) as PanelOptionsModel;
  }
}
