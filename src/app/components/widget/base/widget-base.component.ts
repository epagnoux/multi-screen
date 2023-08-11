import { Injectable, Injector, Input } from '@angular/core';
import { CommunicationChannel, WidgetCommand } from 'src/app/core/UiEnumerations';

import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { BaseComponent } from '../../base/base.component';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class WidgetBase extends BaseComponent {
  @Input() direction = WidgetDirection.Vertical;

  abstract widgetChannel: string | undefined;
  broadcastChannel: BroadcastChannel;

  readonly widgetDirection = WidgetDirection;

  constructor(injector: Injector) {
    super(injector);

    this.broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    this.broadcastChannel.onmessage = (message) => {
      this.receiveMessage(message.data as any);

      switch (message.data?.channel) {
        case this.widgetChannel:
          switch (message.data.command as WidgetCommand) {
            case WidgetCommand.UpdateDetails:
              this.receiveData(message.data.param);
              break;
          }
          break;

        case CommunicationChannel.Widget:
          switch (message.data.command as WidgetCommand) {
            case WidgetCommand.GetDetails:
              if (this.widgetChannel) {
                this.postMessage(new CommunicationMessage(this.widgetChannel, WidgetCommand.UpdateDetails, this.getData()));
              }
              break;
          }
          break;
      }

      BaseComponent.changeDetectorRef?.detectChanges();
    };
  }

  protected postMessage(message: CommunicationMessage | undefined): void {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(message);
    }
  }

  protected abstract receiveMessage(message: CommunicationMessage | undefined): void;
  protected abstract receiveData(data: any | undefined): void;
  protected abstract getData(): any;
}
