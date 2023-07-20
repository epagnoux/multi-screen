import { Component, Input, OnInit } from '@angular/core';

import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { nanoid } from 'nanoid';

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
export class PanelBaseComponent implements OnInit {
  @Input() title?: string;
  @Input() options: PanelOptionsModel | undefined;
  @Input() placement = PanelPlacement.Popup;

  key = nanoid();
  isVisible = false;

  readonly panelPlacement = PanelPlacement;

  constructor(private panelManagerService: PanelManagerService) {}

  ngOnInit(): void {
    this.panelManagerService.optionsUpdated$.subscribe((item) => {
      if (item) {
        this.updateVisibility(item);
      }
    });
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
