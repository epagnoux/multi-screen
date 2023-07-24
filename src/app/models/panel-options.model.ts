import { PanelPlacement } from '../components/panel-base/panel-base.component';

export class PanelOptionsModel {
  key: string;
  currentPlacement: PanelPlacement;
  originalPlacement: PanelPlacement;

  constructor(key: string, currentPlacement: PanelPlacement, originalPlacement = currentPlacement) {
    this.key = key;
    this.currentPlacement = currentPlacement;
    this.originalPlacement = originalPlacement;
  }
}
