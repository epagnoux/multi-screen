import { AfterViewInit, Component, Injector, Input } from '@angular/core';

import { CommunicationChannel, WidgetCommand } from 'src/app/core/UiEnumerations';
import { CommunicationMessage } from 'src/app/models/communication-message.model';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { ScreenService } from 'src/app/services/screen.service';
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
export class PanelBaseComponent extends BaseComponent implements AfterViewInit {
  @Input() title?: string;
  @Input() options: PanelOptionsModel | undefined;

  broadcastChannel: BroadcastChannel | undefined;

  isVisible = false;

  currentWindow: any;
  item: PanelOptionsModel | undefined;
  isMultiScreen: boolean | undefined = false;

  readonly panelPlacement = PanelPlacement;

  constructor(private panelManagerService: PanelManagerService, private screenService: ScreenService, injector: Injector) {
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

    window.addEventListener('unload', (event: Event) => {
      const url = new URL(window.location.href);
      if (url.pathname !== `/${CommunicationChannel.WindowPanel}`) {
        this.broadcastChannel?.postMessage(
          new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClosing, this.options?.currentPlacement)
        );
      }
    });

    this.panelManagerService.register(this.options);
    this.updateVisibility(this.panelManagerService.getOptions(this.options));
  }

  ngAfterViewInit(): void {
    this.screenService.isMutiScreen$.subscribe((isMultiScreen: boolean | undefined) => {
      this.isMultiScreen = isMultiScreen;

      if (this.options && !this.isMultiScreen) {
        // Restore popup if not multiscreen
        this.broadcastChannel?.postMessage(new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClose));
        this.options.currentPlacement = PanelPlacement.Popup;
        this.panelManagerService.setOptions(this.options);
        this.updateVisibility(this.options);
      }
    });
  }

  updateVisibility(item: PanelOptionsModel | undefined) {
    // if (!this.item) {
    //   return;
    // }

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

  protected receiveMessage(message: CommunicationMessage | undefined) {
    switch (message?.channel) {
      case CommunicationChannel.Widget:
        switch (message.command as WidgetCommand) {
          case WidgetCommand.PanelWindowClosing:
            this.broadcastChannel?.postMessage(
              new CommunicationMessage(CommunicationChannel.Widget, WidgetCommand.PanelWindowClose)
            );

            if (message.param && this.item) {
              this.item.currentPlacement = message.param;
              this.panelManagerService.setOptions(this.item);
            }
            this.updateVisibility(this.item);

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
