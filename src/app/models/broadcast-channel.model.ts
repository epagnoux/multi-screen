export class BroadcastChannelModel {
  key: string;
  broadcastChannel: BroadcastChannel;

  constructor(key: any, broadcastChannel: BroadcastChannel) {
    this.key = key;
    this.broadcastChannel = broadcastChannel;
  }
}
