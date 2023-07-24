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
    // TODO: change by Device ex: iPad no multiple
    //this.isMutiScreen = (window.screen as any).isExtended;
    this.isMutiScreen = true;
    this.isMutiScreen$.next(this.isMutiScreen);
  }
}
