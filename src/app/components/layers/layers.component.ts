import { Component, Injector } from '@angular/core';
import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { CommunicationService } from 'src/app/services/communication.service';
import { BaseComponent } from '../base/base.component';
import { WidgetSocialMediaCommand } from '../widget/widget-social-media/widget-social-media.component';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.less']
})
export class LayersComponent extends BaseComponent {
  countCivilians = 0;
  countSocialMedia = 0;
  broadcastChannel: BroadcastChannel | undefined;

  constructor(private communicationService: CommunicationService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    this.broadcastChannel.onmessage = (message) => {
      console.log(message);
    };
  }

  onClickSocialMedia() {
    this.countSocialMedia++;
    // this.communicationService.postMessage(
    //   new CommunicationMessage(CommunicationChannel.SocialMedia, WidgetSocialMediaCommand.UpdateDetails, this.countSocialMedia)
    // );

    // this.broadcastChannel = new BroadcastChannel('toto');
    this.broadcastChannel?.postMessage(
      new CommunicationMessage(CommunicationChannel.SocialMedia, WidgetSocialMediaCommand.UpdateDetails, this.countSocialMedia)
    );
  }

  onClickCivilians() {
    this.countCivilians++;
    // this.communicationService.postMessage(
    //   new CommunicationMessage(CommunicationChannel.Civilians, WidgetCiviliansCommand.UpdateDetails, this.countCivilians)
    // );
    this.broadcastChannel?.postMessage(
      new CommunicationMessage(CommunicationChannel.Civilians, WidgetSocialMediaCommand.UpdateDetails, this.countCivilians)
    );
  }
}
