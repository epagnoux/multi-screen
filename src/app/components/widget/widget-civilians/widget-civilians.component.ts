import { Component, Injector } from '@angular/core';

import { CommunicationChannel } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { CommunicationService } from 'src/app/services/communication.service';
import { WidgetBase } from '../base/widget-base.component';

export enum WidgetCiviliansCommand {
  UpdateDetails = 'updateDetails'
}

@Component({
  selector: 'app-widget-civilians',
  templateUrl: './widget-civilians.component.html',
  styleUrls: ['./widget-civilians.component.less']
})
export class WidgetCiviliansComponent extends WidgetBase {
  item = 0;

  constructor(private communicationService: CommunicationService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.subscribe(
      this.communicationService.message$.subscribe((message: CommunicationMessage | undefined) => {
        switch (message?.channel) {
          case CommunicationChannel.Civilians:
            switch (message.command as WidgetCiviliansCommand) {
              case WidgetCiviliansCommand.UpdateDetails:
                this.item = message.param;

                break;
            }
            break;
        }
      })
    );
  }
}
