export class CommunicationMessage {
  channel: string;
  command: any;
  param: any;

  constructor(channel: string, command: any, param = undefined) {
    this.channel = channel;
    this.command = command;
    this.param = param;
  }
}
