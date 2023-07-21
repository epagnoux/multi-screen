import { Component, Injector, Input } from '@angular/core';

import { CommunicationChannel, WidgetCommand } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { BaseComponent } from '../base/base.component';

export enum PanelPlacement {
  Popup = 'popup',
  Embeded = 'embeded',
  Window = 'window'
}
@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.less']
})
export class PanelBaseComponent extends BaseComponent {
  @Input() title?: string;
  @Input() options: PanelOptionsModel | undefined;
  @Input() placement = PanelPlacement.Embeded;

  broadcastChannel: BroadcastChannel | undefined;

  isVisible = false;

  readonly panelPlacement = PanelPlacement;
  currentWindow: any;
  item: any;

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    this.broadcastChannel.onmessage = (message) => {
      console.log(message);
      this.receiveMessage(message.data as any);
      BaseComponent.changeDetectorRef?.detectChanges();
    };

    this.subscribe(
      this.panelManagerService.optionsUpdated$.subscribe((item) => {
        console.log(this.placement);

        this.item = item;
        if (this.item) {
          this.updateVisibility(this.item);
        }
      })
    );

    if (!this.options) {
      this.options = new PanelOptionsModel(CommunicationChannel.PanelManager, this.placement);
    }

    this.panelManagerService.register(this.options);
    this.updateVisibility(this.panelManagerService.getOptions(this.options));
  }

  updateVisibility(item: PanelOptionsModel) {
    if (this.placement === PanelPlacement.Window) {
      console.log('window');
    }

    if (item.placement === PanelPlacement.Window && item.placement === this.placement) {
      this.isVisible = true;
      return;
    }

    this.isVisible = item.placement === this.placement;
    BaseComponent.changeDetectorRef?.detectChanges();
    console.log(this.placement + ' / ' + this.isVisible);
    console.log('aaa');
  }

  onUpdatePlacement(placement: PanelPlacement) {
    if (this.options?.placement === PanelPlacement.Window && placement !== PanelPlacement.Window) {
      // Closing Panel window
      this.broadcastChannel?.postMessage(
        new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClosing, placement)
      );
    }

    if (this.options) {
      this.options.placement = placement;
      this.panelManagerService.setOptions(this.options);
    }
  }

  protected receiveMessage(message: CommunicationMessage | undefined): void {
    switch (message?.channel) {
      case CommunicationChannel.Widget:
        switch (message.command as WidgetCommand) {
          case WidgetCommand.PanelWindowClosing:
            this.item.placement = message.param;
            this.updateVisibility(this.item);

            this.broadcastChannel?.postMessage(
              new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClose)
            );
            break;

          case WidgetCommand.PanelWindowClose:
            if (this.placement === PanelPlacement.Window) {
              window.close();
            }
            break;
        }
        break;
    }
    BaseComponent.changeDetectorRef?.detectChanges();
  }
}
