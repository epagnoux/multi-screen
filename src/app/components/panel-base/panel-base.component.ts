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
  //@Input() originalPlacement = PanelPlacement.Embeded;

  broadcastChannel: BroadcastChannel | undefined;

  isVisible = false;

  readonly panelPlacement = PanelPlacement;
  currentWindow: any;
  item: PanelOptionsModel | undefined;

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.broadcastChannel = new BroadcastChannel(CommunicationChannel.Widget);

    this.broadcastChannel.onmessage = (message) => {
      this.receiveMessage(message.data as any);
      BaseComponent.changeDetectorRef?.detectChanges();
    };

    this.subscribe(
      this.panelManagerService.optionsUpdated$.subscribe((item: PanelOptionsModel | undefined) => {
        this.item = item;
        if (this.item) {
          this.updateVisibility(this.item);
        }
      })
    );

    // if (!this.options) {
    //   this.options = new PanelOptionsModel(CommunicationChannel.PanelManager, this.options?.currentPlacement);
    // }

    this.panelManagerService.register(this.options);
    this.updateVisibility(this.panelManagerService.getOptions(this.options));
  }

  updateVisibility(item: PanelOptionsModel | undefined) {
    if (this.options?.originalPlacement === PanelPlacement.Window) {
      console.log('window');
    }

    if (item?.currentPlacement === PanelPlacement.Window && item.currentPlacement === this.options?.originalPlacement) {
      this.isVisible = true;
      return;
    }

    this.isVisible = item?.currentPlacement === this.options?.originalPlacement;
    BaseComponent.changeDetectorRef?.detectChanges();
  }

  onUpdatePlacement(placement: PanelPlacement) {
    if (this.options?.currentPlacement === PanelPlacement.Window && placement !== PanelPlacement.Window) {
      // Closing Panel window
      this.broadcastChannel?.postMessage(
        new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClosing, placement)
      );
    }

    if (this.options) {
      this.options.currentPlacement = placement;
      this.panelManagerService.setOptions(this.options);
    }
  }

  protected receiveMessage(message: CommunicationMessage | undefined): void {
    switch (message?.channel) {
      case CommunicationChannel.Widget:
        switch (message.command as WidgetCommand) {
          case WidgetCommand.PanelWindowClosing:
            if (message.param && this.item) {
              this.item.currentPlacement = message.param;
            }
            this.updateVisibility(this.item);

            this.broadcastChannel?.postMessage(
              new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClose)
            );
            break;

          case WidgetCommand.PanelWindowClose:
            if (this.options?.originalPlacement === PanelPlacement.Window) {
              window.close();
            }
            break;
        }
        break;
    }
    BaseComponent.changeDetectorRef?.detectChanges();
  }
}
