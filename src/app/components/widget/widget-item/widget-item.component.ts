import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-item',
  templateUrl: './widget-item.component.html',
  styleUrls: ['./widget-item.component.less']
})
export class WidgetItemComponent implements OnInit {
  @Input() title?: string;

  constructor() {}

  ngOnInit(): void {}
}
