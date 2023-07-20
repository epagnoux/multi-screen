import { Component, Injector } from '@angular/core';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { BaseComponent, WidgetDirection } from '../base/base.component';
import { PanelPlacement } from '../panel-base/panel-base.component';

@Component({
  selector: 'app-window-panel',
  templateUrl: './window-panel.component.html',
  styleUrls: ['./window-panel.component.less']
})
export class WindowPanelComponent extends BaseComponent {
  options: PanelOptionsModel | undefined;
  key = 'PanelWidget';

  readonly widgetDirection = WidgetDirection;
  readonly panelPlacement = PanelPlacement;

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.options = new PanelOptionsModel(this.key, PanelPlacement.Window);
    this.panelManagerService.register(this.options);
    this.panelManagerService.setOptions(this.options);
  }
}
