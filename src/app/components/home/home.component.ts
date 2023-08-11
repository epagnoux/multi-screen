import { AfterViewInit, Component, Injector } from '@angular/core';
import { PanelOptionsModel } from 'src/app/models/panel-options.model';
import { PanelManagerService } from 'src/app/services/panel-manager.service';
import { BaseComponent } from '../base/base.component';
import { PanelPlacement } from '../panel-base/panel-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements AfterViewInit {
  //readonly widgetDirection = WidgetDirection;
  //readonly panelPlacement = PanelPlacement;

  panelOptionsPopup: PanelOptionsModel | undefined;
  panelOptionsEmbedded: PanelOptionsModel | undefined;
  keyPanelWidget = 'PanelWidget';

  constructor(private panelManagerService: PanelManagerService, injector: Injector) {
    super(injector);
  }
  ngAfterViewInit(): void {
    if (this.panelOptionsPopup) {
      this.panelManagerService.setOptions(this.panelOptionsPopup);
    }
  }

  protected override onInit(): void {
    this.panelOptionsPopup = new PanelOptionsModel(this.keyPanelWidget, PanelPlacement.Popup);
    this.panelOptionsEmbedded = new PanelOptionsModel(this.keyPanelWidget, PanelPlacement.Embedded);
  }
}
