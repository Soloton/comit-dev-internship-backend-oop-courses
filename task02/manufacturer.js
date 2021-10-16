import { Industrial } from "./industrial.js";

export class Manufacturer extends Industrial {
  constructor() {
    super();
    this.setLimits(50, 150);
  }

  getGeneratedGoodsCount() {
    return this._generateGoodsCount();
  }
}
