import { Component, Injector } from '@angular/core';
import { CommunicationChannel, WidgetCommand } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.less']
})
export class LayersComponent extends BaseComponent {
  countCivilians = 0;
  countSocialMedia = 0;
  broadcastChannel: BroadcastChannel | undefined;

  constructor(injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    this.broadcastChannel.onmessage = (message) => {
      //      console.log(message);
    };
  }

  onClickSocialMedia() {
    this.countSocialMedia++;
    this.broadcastChannel?.postMessage(
      new CommunicationMessage(CommunicationChannel.SocialMedia, WidgetCommand.UpdateDetails, this.countSocialMedia)
    );
  }

  onClickCivilians() {
    this.countCivilians++;
    this.broadcastChannel?.postMessage(
      new CommunicationMessage(CommunicationChannel.Civilians, WidgetCommand.UpdateDetails, this.countCivilians)
    );
  }
}
