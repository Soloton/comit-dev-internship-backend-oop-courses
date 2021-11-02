import { Goods } from "./goods.js";

export function AbstractPerson() {
  if (this.constructor === AbstractPerson) {
    throw new TypeError("Can not construct abstract class.");
  }

  this._goods = new Goods(0);

  this.setGoodsCount = function (goodsCount) {
    this._goods.setCount(goodsCount);
  };

  this.increaseGoodsCount = function (goodsCount) {
    return this._goods.increaseCount(goodsCount);
  };

  this.decreaseGoodsCount = function (goodsCount) {
    return this._goods.decreaseCount(goodsCount);
  };

  this.getGoodsCount = function () {
    return this._goods.getCount();
  };
}
