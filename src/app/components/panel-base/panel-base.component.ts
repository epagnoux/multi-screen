import { Component, Injector, Input } from '@angular/core';

import { nanoid } from 'nanoid';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { BaseComponent } from '../base/base.component';

export enum PanelPlacement {
  Popup = 'popup',
  Embeded = 'embeded',
  Window = 'window'
}
@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.less']
})
export class PanelBaseComponent extends BaseComponent {
  @Input() title?: string;
  @Input() options: PanelOptionsModel | undefined;
  @Input() placement = PanelPlacement.Popup;

  key = nanoid();
  isVisible = false;

  readonly panelPlacement = PanelPlacement;

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.subscribe(
      this.panelManagerService.optionsUpdated$.subscribe((item) => {
        if (item) {
          this.updateVisibility(item);
        }
      })
    );

    if (!this.options) {
      this.options = new PanelOptionsModel(this.key, this.placement);
    }

    this.panelManagerService.register(this.options);
    this.updateVisibility(this.panelManagerService.getOptions(this.options));
  }

  updateVisibility(item: PanelOptionsModel) {
    this.isVisible = item.placement === this.placement;
  }

  onUpdatePlacement(placement: PanelPlacement) {
    if (this.options) {
      this.options.placement = placement;
      this.panelManagerService.setOptions(this.options);
    }
  }
}
