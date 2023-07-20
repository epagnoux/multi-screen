import { Component } from '@angular/core';
import { PanelManagerService } from './services/panel-manager.service';
import { PanelOptionsModel } from './models/panel-options.model';
import { PanelPlacement } from './components/panel-base/panel-base.component';
import { WidgetDirection } from './components/widget/base/widget-base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'multi-screen';

  readonly widgetDirection = WidgetDirection;
  readonly panelPlacement = PanelPlacement;
  options: PanelOptionsModel;
  key = 'PanelWidget';

  constructor(private panelManagerService: PanelManagerService) {
    this.options = new PanelOptionsModel(this.key, PanelPlacement.Popup);
    panelManagerService.setOptions(this.options);
  }
}
