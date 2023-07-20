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
  @Input() placement = PanelPlacement.Popup;
  @Input() key = nanoid();

  options: PanelOptionsModel | undefined;

  readonly panelPlacement = PanelPlacement;

  constructor(private panelManagerService: PanelManagerService) {}

  ngOnInit(): void {
    this.options = new PanelOptionsModel(this.key, this.placement);
    this.panelManagerService.register(this.options);
  }
}
