import { Component } from '@angular/core';
import { WidgetBase } from '../base/widget-base.component';

@Component({
  selector: 'app-widget-social-media',
  templateUrl: './widget-social-media.component.html',
  styleUrls: ['./widget-social-media.component.less']
})
export class WidgetSocialMediaComponent extends WidgetBase {
  constructor() {
    super();
  }
}
