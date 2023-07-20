import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor() { }


  getScreenDetails(){
    return window.screen()
  }
  await window.screen();

{
  currentScreen: ScreenDetailed {left: 0, top: 0, isPrimary: true, isInternal: true, devicePixelRatio: 2, …}
  oncurrentscreenchange: null
  onscreenschange: null
  screens: [{
    // The MacBook Pro
    availHeight: 969
    availLeft: 0
    availTop: 25
    availWidth: 1680
    colorDepth: 30
    devicePixelRatio: 2
    height: 1050
    isExtended: true
    isInternal: true
    isPrimary: true
    label: "Built-in Retina Display"
    left: 0
    onchange: null
    orientation: ScreenOrientation {angle: 0, type: "landscape-primary", onchange: null}
    pixelDepth: 30
    top: 0
    width: 1680
  },
  {
    // The iPad
    availHeight: 999
    availLeft: 1680
    availTop: 25
    availWidth: 1366
    colorDepth: 24
    devicePixelRatio: 2
    height: 1024
    isExtended: true
    isInternal: false
    isPrimary: false
    label: "Sidecar Display (AirPlay)"
    left: 1680
    onchange: null
    orientation: ScreenOrientation {angle: 0, type: "landscape-primary", onchange: null}
    pixelDepth: 24
    top: 0
    width: 1366
  }]
}
}
