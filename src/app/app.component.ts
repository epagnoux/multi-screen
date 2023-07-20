import { Component } from '@angular/core';
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
  
  constructor(){
    console.log('aaa');
    
  }
}
