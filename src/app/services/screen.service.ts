import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  public isMutiScreen: boolean | undefined;
  public isMutiScreen$ = new BehaviorSubject<boolean | undefined>(undefined);

  constructor() {
    this.updateIsMultiscreen();

    window.addEventListener('resize', (event) => {
      this.updateIsMultiscreen();
    });
  }
  private updateIsMultiscreen() {
    this.isMutiScreen = (window.screen as any).isExtended;
    this.isMutiScreen$.next(this.isMutiScreen);
  }
}
