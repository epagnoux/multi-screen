import { Injectable, Injector, Input } from '@angular/core';

import { BaseComponent } from '../../base/base.component';
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

    this.subscribe(
      BaseComponent.communicationService?.message$.subscribe((message: CommunicationMessage | undefined) => {
        this.receiveMessage(message);
      })
    );

    const broadcastChannel = BaseComponent.communicationService?.getBroadcastChannel(this.key);

    if (broadcastChannel) {
      broadcastChannel.onmessage = (message) => {
        console.log('Received message', message);
        if (message) {
          this.receiveMessage(message.currentTarget as any);
        }
      };
    }
  }

  protected abstract setKey(): void;
  protected abstract receiveMessage(message: CommunicationMessage | undefined): void;
}
