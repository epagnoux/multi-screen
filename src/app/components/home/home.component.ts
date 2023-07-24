import { AfterViewInit, Component, Injector } from '@angular/core';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { BaseComponent, WidgetDirection } from '../base/base.component';
import { PanelPlacement } from '../panel-base/panel-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements AfterViewInit {
  readonly widgetDirection = WidgetDirection;
  readonly panelPlacement = PanelPlacement;
  optionsPopup: PanelOptionsModel | undefined;
  optionsembedded: PanelOptionsModel | undefined;
  key = 'PanelWidget';

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }
  ngAfterViewInit(): void {
    if (this.optionsPopup) {
      this.panelManagerService.setOptions(this.optionsPopup);
    }
  }

  protected override onInit(): void {
    this.optionsPopup = new PanelOptionsModel(this.key, PanelPlacement.Popup);
    this.optionsembedded = new PanelOptionsModel(this.key, PanelPlacement.Embedded);
  }
}
