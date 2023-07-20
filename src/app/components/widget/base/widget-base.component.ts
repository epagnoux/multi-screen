import { Injectable, Input, OnDestroy, OnInit } from '@angular/core';

import { nanoid } from 'nanoid';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class WidgetBase implements OnInit, OnDestroy {
  @Input() direction = WidgetDirection.Vertical;
  @Input() id = nanoid();

  readonly widgetDirection = WidgetDirection;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
