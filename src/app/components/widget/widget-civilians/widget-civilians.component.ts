import { Component, Injector } from '@angular/core';

import { WidgetBase } from '../base/widget-base.component';

@Component({
  selector: 'app-widget-civilians',
  templateUrl: './widget-civilians.component.html',
  styleUrls: ['./widget-civilians.component.less']
})
export class WidgetCiviliansComponent extends WidgetBase {
  constructor(injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}
}
