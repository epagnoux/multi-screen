import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'multi-screen';
  isMultiScreen = false;

  constructor() {
    var extendedScreen = window.innerWidth > screen.availWidth;
    // console.log(window.screen);
    // console.log(extendedScreen);
    console.log('window.screen: ', (window.screen as any).isExtended);
    this.isMultiScreen = (window.screen as any).isExtended;
    window.addEventListener('resize', (event) => {
      console.log('window.screen: ', (window.screen as any).isExtended);
      this.isMultiScreen = (window.screen as any).isExtended;
      //console.log(event);
    });
  }
}
