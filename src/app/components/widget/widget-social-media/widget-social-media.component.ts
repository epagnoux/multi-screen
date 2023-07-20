import { Component, Injector } from '@angular/core';

import { nanoid } from 'nanoid';
import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { WidgetBase } from '../base/widget-base.component';

export enum WidgetSocialMediaCommand {
  UpdateDetails = 'updateDetails'
}
@Component({
  selector: 'app-widget-social-media',
  templateUrl: './widget-social-media.component.html',
  styleUrls: ['./widget-social-media.component.less']
})
export class WidgetSocialMediaComponent extends WidgetBase {
  item = 0;
  id = nanoid();

  constructor(injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}

  protected override setKey(): void {
    this.key = CommunicationChannel.SocialMedia;
  }

  protected override receiveMessage(message: CommunicationMessage | undefined): void {
    switch (message?.channel) {
      case CommunicationChannel.SocialMedia:
        switch (message.command as WidgetSocialMediaCommand) {
          case WidgetSocialMediaCommand.UpdateDetails:
            setTimeout(() => {
              this.item = message.param;
            }, 0);

            break;
        }
        break;
    }
  }
}
