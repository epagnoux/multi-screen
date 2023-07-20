import { Component, Injector } from '@angular/core';

import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { CommunicationService } from 'src/app/services/communication.service';
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

  constructor(private communicationService: CommunicationService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.subscribe(
      this.communicationService.message$.subscribe((message: CommunicationMessage | undefined) => {
        switch (message?.channel) {
          case CommunicationChannel.SocialMedia:
            switch (message.command as WidgetSocialMediaCommand) {
              case WidgetSocialMediaCommand.UpdateDetails:
                this.item = message.param;
                break;
            }
            break;
        }
      })
    );
  }
}
