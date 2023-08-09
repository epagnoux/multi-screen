import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PanelPlacement } from '../components/panel-base/panel-base.component';
import { RoutingPaths } from '../core/UiEnumerations';
import { PanelOptionsModel } from '../models/panel-options.model';

@Injectable({
  providedIn: 'root'
})
export class PanelManagerService {
  items: PanelOptionsModel[] = [];

  public optionsUpdated: PanelOptionsModel | undefined;
  public optionsUpdated$ = new BehaviorSubject<PanelOptionsModel | undefined>(undefined);

  constructor(private router: Router) {}

  register(options: PanelOptionsModel | undefined) {
    if (!options) {
      return;
    }
    // Clone options
    this.items.push({ ...options });
  }
  unregister(options: PanelOptionsModel) {
    this.items = this.items.filter((p) => p.key !== options.key);
    console.log('PanelManager Items Length: ', this.items.length);
  }

  setOptions(options: PanelOptionsModel) {
    const item = this.items.find((p) => p.key === options.key);
    if (item) {
      const isFirstOpeneingWindow =
        options.currentPlacement === PanelPlacement.Window && item.currentPlacement !== options.currentPlacement;

      item.currentPlacement = options.currentPlacement;
      this.optionsUpdated = item;
      this.optionsUpdated$.next(this.optionsUpdated);

      if (isFirstOpeneingWindow) {
        const routePath = this.router.createUrlTree([`${RoutingPaths.WidgetPanel}`]).toString();
        const windowOptions =
          'toolbar=0,scrollbars=0,resizable=0,menubar=0,status=0,titlebar=0,left=100,top=100,width=400,height=700';
        window.open(routePath, '_blank', windowOptions);
      }
    }
  }

  getOptions(options: PanelOptionsModel | undefined) {
    if (!options) {
      return;
    }
    return this.items.find((p) => p.key === options.key) as PanelOptionsModel;
  }
}
