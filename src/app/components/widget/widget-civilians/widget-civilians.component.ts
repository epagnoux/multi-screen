import { Component, Injector } from '@angular/core';

import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { WidgetBase } from '../base/widget-base.component';

@Component({
  selector: 'app-widget-civilians',
  templateUrl: './widget-civilians.component.html',
  styleUrls: ['./widget-civilians.component.less']
})
export class WidgetCiviliansComponent extends WidgetBase {
  override widgetChannel = CommunicationChannel.Civilians;

  item = 0;

  constructor(injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}

  protected override receiveMessage(message: CommunicationMessage | undefined): void {
    // switch (message?.channel) {
    //   case CommunicationChannel.Civilians:
    //     switch (message.command as WidgetCommand) {
    //       case WidgetCommand.UpdateDetails:
    //         this.item = message.param;
    //         break;
    //     }
    //     break;
    //   case CommunicationChannel.Widget:
    //     switch (message.command as WidgetCommand) {
    //       case WidgetCommand.GetDetails:
    //         this.postMessage(new CommunicationMessage(CommunicationChannel.Civilians, WidgetCommand.UpdateDetails, this.item));
    //         break;
    //     }
    //     break;
    // }
  }
  protected override receiveData(data: any): void {
    this.item = data;
  }
  protected override getData() {
    return this.item;
  }
}
