import { Injectable, Injector, Input } from '@angular/core';

import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { BaseComponent } from '../../base/base.component';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class WidgetBase extends BaseComponent {
  @Input() direction = WidgetDirection.Vertical;

  broadcastChannel: BroadcastChannel;

  readonly widgetDirection = WidgetDirection;

  constructor(injector: Injector) {
    super(injector);

    this.broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    this.broadcastChannel.onmessage = (message) => {
      this.receiveMessage(message.data as any);
      BaseComponent.changeDetectorRef?.detectChanges();
    };
  }

  protected postMessage(message: CommunicationMessage | undefined): void {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(message);
    }
  }

  protected abstract receiveMessage(message: CommunicationMessage | undefined): void;
}
