import { Component, Injector } from '@angular/core';

import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { WidgetBase } from '../base/widget-base.component';

export enum WidgetCiviliansCommand {
  UpdateDetails = 'updateDetails'
}

@Component({
  selector: 'app-widget-civilians',
  templateUrl: './widget-civilians.component.html',
  styleUrls: ['./widget-civilians.component.less']
})
export class WidgetCiviliansComponent extends WidgetBase {
  item = 0;

  constructor(injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}

  protected override setKey(): void {
    this.key = CommunicationChannel.Civilians;
  }

  protected override receiveMessage(message: CommunicationMessage | undefined): void {
    switch (message?.channel) {
      case CommunicationChannel.Civilians:
        switch (message.command as WidgetCiviliansCommand) {
          case WidgetCiviliansCommand.UpdateDetails:
            this.item = message.param;

            break;
        }
        break;
    }
  }
}
