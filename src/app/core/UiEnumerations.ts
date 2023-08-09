import { Injector } from '@angular/core';

export enum CommunicationChannel {
  SocialMedia = 'socialMedia',
  Civilians = 'civilians',
  WindowPanel = 'windowPanel',
  Widget = 'Widget'
}

export enum WidgetCommand {
  UpdateDetails = 'updateDetails',
  GetDetails = 'getDetails',
  PanelWindowClose = 'panelWindowClose',
  PanelWindowClosing = 'panelWindowClosing'
}

export enum RoutingPaths {
  WidgetPanel = 'widgetPanel'
}

export class UiEnumerations {
  constructor(protected injector: Injector) {}

  readonly routingPaths = CommunicationChannel;
}
