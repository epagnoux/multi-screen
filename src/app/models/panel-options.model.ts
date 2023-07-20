import { PanelPlacement } from '../components/panel-base/panel-base.component';

export class PanelOptionsModel {
  key: string;
  placement: PanelPlacement;

  constructor(key: any, placement: PanelPlacement) {
    this.key = key;
    this.placement = placement;
  }
}
