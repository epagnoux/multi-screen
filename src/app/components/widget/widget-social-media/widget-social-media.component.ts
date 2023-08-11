import { ChangeDetectorRef, Component, Injector } from '@angular/core';

import { nanoid } from 'nanoid';
import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { WidgetBase } from '../base/widget-base.component';

@Component({
  selector: 'app-widget-social-media',
  templateUrl: './widget-social-media.component.html',
  styleUrls: ['./widget-social-media.component.less']
})
export class WidgetSocialMediaComponent extends WidgetBase {
  override widgetChannel = CommunicationChannel.SocialMedia;

  item = 0;
  id = nanoid();

  constructor(private cdRef: ChangeDetectorRef, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}

  protected override receiveMessage(message: CommunicationMessage | undefined): void {
    // switch (message?.channel) {
    //   case CommunicationChannel.SocialMedia:
    //     switch (message.command as WidgetCommand) {
    //       case WidgetCommand.UpdateDetails:
    //         this.item = message.param;
    //         break;
    //     }
    //     break;
    //   case CommunicationChannel.Widget:
    //     switch (message.command as WidgetCommand) {
    //       case WidgetCommand.GetDetails:
    //         this.postMessage(new CommunicationMessage(CommunicationChannel.SocialMedia, WidgetCommand.UpdateDetails, this.item));
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
