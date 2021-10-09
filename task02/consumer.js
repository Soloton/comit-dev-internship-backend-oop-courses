import { Industrial } from "./industrial.js";

export class Consumer extends Industrial {
  constructor() {
    super();
    super.setLimits(70, 120);
  }

  getNeededGoodsCount() {
    return this._generateGoodsCount();
  }
}
