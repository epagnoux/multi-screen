import { Component, Injector } from '@angular/core';

import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { WidgetBase } from '../base/widget-base.component';

@Component({
  selector: 'app-widget-manager',
  templateUrl: './widget-manager.component.html',
  styleUrls: ['./widget-manager.component.less']
})
export class WidgetManagerComponent extends WidgetBase {
  override widgetChannel: string | undefined;

  constructor(injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}

  protected override receiveMessage(message: CommunicationMessage | undefined): void {}
  protected override receiveData(data: any): void {}
  protected override getData() {}
}
