import { Injector } from '@angular/core';

export enum CommunicationChannel {
  Application = 'application',
  SocialMedia = 'SocialMedia',
  Civilians = 'civilians'
}

export class UiEnumerations {
  constructor(protected injector: Injector) {}

  readonly routingPaths = CommunicationChannel;
}
