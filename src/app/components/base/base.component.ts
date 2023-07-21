import { ChangeDetectorRef, Injectable, Injector, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { UiEnumerations } from 'src/app/core/UiEnumerations';

export enum WidgetDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

@Injectable()
export abstract class BaseComponent extends UiEnumerations implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public static changeDetectorRef: ChangeDetectorRef | undefined = undefined;

  constructor(injector: Injector) {
    super(injector);
    if (!BaseComponent.changeDetectorRef) {
      BaseComponent.changeDetectorRef = injector.get(ChangeDetectorRef);
    }
  }

  ngOnInit(): void {
    this.onInit();
  }

  subscribe(sub: Subscription | undefined): void {
    if (sub) {
      this.subscriptions.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((s) => {
      s?.unsubscribe();
    });

    this.onDestroy();
  }

  protected abstract onInit(): void;
  protected onDestroy(): void {
    // Intentional
  }
}
