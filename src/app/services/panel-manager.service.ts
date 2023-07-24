import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PanelPlacement } from '../components/panel-base/panel-base.component';
import { RoutingPaths } from '../core/UiEnumerations';
import { PanelOptionsModel } from '../models/panel-options.model';
import { ScreenService } from './screen.service';

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
  private isMultiScreen: boolean | undefined;

  public optionsUpdated: PanelOptionsModel | undefined;
  public optionsUpdated$ = new BehaviorSubject<PanelOptionsModel | undefined>(undefined);

  constructor(private screenService: ScreenService, private router: Router) {
    this.screenService.isMutiScreen$.subscribe((isMultiScreen: boolean | undefined) => {
      this.isMultiScreen = isMultiScreen;
      if (this.isMultiScreen) {
        this.setOptions;
      }
    });
  }

  register(options: PanelOptionsModel | undefined) {
    if (!options) {
      return;
    }
    // Clone options
    this.items.push({ ...options });
    //console.log('PanelManager Items Length: ', this.items.length);
  }
  unregister(options: PanelOptionsModel) {
    this.items = this.items.filter((p) => p.key !== options.key);
    console.log('PanelManager Items Length: ', this.items.length);
  }

  setOptions(windoOptions: PanelOptionsModel) {
    const item = this.items.find((p) => p.key === windoOptions.key);
    if (item) {
      const isFirstOpeneingWindow =
        windoOptions.currentPlacement === PanelPlacement.Window && item.currentPlacement !== windoOptions.currentPlacement;

      item.currentPlacement = windoOptions.currentPlacement;
      this.optionsUpdated = item;
      this.optionsUpdated$.next(this.optionsUpdated);

      if (isFirstOpeneingWindow) {
        const routePath = this.router.createUrlTree([`${RoutingPaths.WindowPanel}`]).toString();
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
