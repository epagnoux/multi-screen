import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window-panel',
  templateUrl: './window-panel.component.html',
  styleUrls: ['./window-panel.component.less']
})
export class WindowPanelComponent implements OnInit {
  constructor() {
    console.log('aa');
  }

  ngOnInit(): void {}
}
