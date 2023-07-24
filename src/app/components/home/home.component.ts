import { Component, Injector } from '@angular/core';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { BaseComponent, WidgetDirection } from '../base/base.component';
import { PanelPlacement } from '../panel-base/panel-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent {
  readonly widgetDirection = WidgetDirection;
  readonly panelPlacement = PanelPlacement;
  optionsPopup: PanelOptionsModel | undefined;
  optionsEmbeded: PanelOptionsModel | undefined;
  key = 'PanelWidget';

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }

  protected override onInit(): void {
    this.optionsPopup = new PanelOptionsModel(this.key, PanelPlacement.Popup);
    this.optionsEmbeded = new PanelOptionsModel(this.key, PanelPlacement.Embeded);
    this.panelManagerService.setOptions(this.optionsPopup);
  }
}
