import { Injectable, Injector, Input } from '@angular/core';

import { BaseComponent } from '../../base/base.component';
import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { nanoid } from 'nanoid';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class WidgetBase extends BaseComponent {
  @Input() direction = WidgetDirection.Vertical;
  @Input() key = nanoid();

  readonly widgetDirection = WidgetDirection;

  constructor(injector: Injector) {
    super(injector);

    this.setKey();

    const broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    broadcastChannel.onmessage = (message) => {
      console.log(message);
      this.receiveMessage(message.data as any);
      BaseComponent.changeDetectorRef?.detectChanges();
    };
  }

  protected abstract setKey(): void;
  protected abstract receiveMessage(message: CommunicationMessage | undefined): void;
}
