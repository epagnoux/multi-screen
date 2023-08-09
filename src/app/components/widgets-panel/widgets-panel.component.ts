import { Component, Injector } from '@angular/core';
import { CommunicationChannel, WidgetCommand } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { PanelPlacement } from '../panel-base/panel-base.component';
import { WidgetBase } from '../widget/base/widget-base.component';

@Component({
  selector: 'app-widgets-panel',
  templateUrl: './widgets-panel.component.html',
  styleUrls: ['./widgets-panel.component.less']
})
export class WidgetsPanelComponent extends WidgetBase {
  options: PanelOptionsModel | undefined;
  //key = 'PanelWidget';

  //readonly widgetDirection = WidgetDirection;
  readonly panelPlacement = PanelPlacement;

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.options = new PanelOptionsModel(CommunicationChannel.WindowPanel, PanelPlacement.Window);
    this.panelManagerService.register(this.options);
    this.panelManagerService.setOptions(this.options);
    this.broadcastChannel?.postMessage(new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.GetDetails));

    window.addEventListener('unload', (event) => {
      console.log('unload');
      if (this.options?.currentPlacement === PanelPlacement.Window) {
        this.broadcastChannel?.postMessage(
          new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClosing, PanelPlacement.Popup)
        );
      }
    });
  }
  protected override receiveMessage(message: CommunicationMessage | undefined): void {}
}
