import { Injector } from '@angular/core';

export enum CommunicationChannel {
  Application = 'application',
  SocialMedia = 'socialMedia',
  Civilians = 'civilians',
  PanelManager = 'panelManager',
  Widget = 'Widget'
}

export enum WidgetCommand {
  UpdateDetails = 'updateDetails',
  GetDetails = 'getDetails',
  PanelWindowClose = 'panelWindowClose',
  PanelWindowClosing = 'panelWindowClosing'
}

export enum RoutingPaths {
  WindowPanel = 'windowPanel'
}

export class UiEnumerations {
  constructor(protected injector: Injector) {}

  readonly routingPaths = CommunicationChannel;
}
