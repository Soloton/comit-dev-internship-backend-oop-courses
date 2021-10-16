import { Goods } from "./goods.js";

export class AbstractPerson {
  _goods = new Goods(0);

  constructor() {
    if (this.constructor === AbstractPerson) {
      throw new TypeError("Can not construct abstract class.");
    }
  }

  setGoodsCount(goodsCount) {
    this._goods.setCount(goodsCount);
  }

  increaseGoodsCount(goodsCount) {
    return this._goods.increaseCount(goodsCount);
  }

  decreaseGoodsCount(goodsCount) {
    return this._goods.decreaseCount(goodsCount);
  }

  getGoodsCount() {
    return this._goods.getCount();
  }
}
