import { WidgetBase } from '../base/widget-base.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-widget-manager',
  templateUrl: './widget-manager.component.html',
  styleUrls: ['./widget-manager.component.less']
})
export class WidgetManagerComponent extends WidgetBase {
  constructor() {
    super();
  }
}
