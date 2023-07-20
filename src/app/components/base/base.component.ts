import { Injectable, Injector, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class BaseComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(protected injector: Injector) {}

  ngOnInit(): void {}

  subscribe(sub: Subscription): void {
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((s) => {
      s?.unsubscribe();
    });

    this.onDestroy();
  }

  protected onDestroy(): void {
    // Intentional
  }
}
