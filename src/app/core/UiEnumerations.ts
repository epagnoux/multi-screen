import { Injector } from '@angular/core';

export enum CommunicationChannel {
  Application = 'application',
  SocialMedia = 'socialMedia',
  Civilians = 'civilians',
  Widget = 'Widget'
}

export enum RoutingPaths {
  WindowPanel = 'windowPanel'
}

export class UiEnumerations {
  constructor(protected injector: Injector) {}

  readonly routingPaths = CommunicationChannel;
}
