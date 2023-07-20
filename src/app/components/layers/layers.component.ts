import { Component, Injector } from '@angular/core';
import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { CommunicationService } from 'src/app/services/communication.service';
import { WidgetBase } from '../widget/base/widget-base.component';
import { WidgetCiviliansCommand } from '../widget/widget-civilians/widget-civilians.component';
import { WidgetSocialMediaCommand } from '../widget/widget-social-media/widget-social-media.component';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.less']
})
export class LayersComponent extends WidgetBase {
  countCivilians = 0;
  countSocialMedia = 0;

  constructor(private communicationService: CommunicationService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {}

  onClickSocialMedia() {
    this.countSocialMedia++;
    this.communicationService.postMessage(
      new CommunicationMessage(CommunicationChannel.SocialMedia, WidgetSocialMediaCommand.UpdateDetails, this.countSocialMedia)
    );
  }

  onClickCivilians() {
    this.countCivilians++;
    this.communicationService.postMessage(
      new CommunicationMessage(CommunicationChannel.Civilians, WidgetCiviliansCommand.UpdateDetails, this.countCivilians)
    );
  }
}
