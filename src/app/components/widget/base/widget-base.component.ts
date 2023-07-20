import { Injectable, Injector, Input } from '@angular/core';

import { BaseComponent } from '../../base/base.component';
import { nanoid } from 'nanoid';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class WidgetBase extends BaseComponent {
  @Input() direction = WidgetDirection.Vertical;
  @Input() id = nanoid();

  readonly widgetDirection = WidgetDirection;

  constructor(injector: Injector) {
    super(injector);
  }
}
