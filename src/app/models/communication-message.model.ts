export class CommunicationMessage {
  command: any;
  param: any;

  constructor(command: any, param = undefined) {
    this.command = command;
    this.param = param;
  }
}
