import { Goods } from "./goods.js";

export function AbstractPerson() {
  if (this.constructor === AbstractPerson) {
    throw new TypeError("Can not construct abstract class.");
  }

  this._goods = new Goods(0);
}

AbstractPerson.prototype.setGoodsCount = function (goodsCount) {
  this._goods.setCount(goodsCount);
};

AbstractPerson.prototype.increaseGoodsCount = function (goodsCount) {
  return this._goods.increaseCount(goodsCount);
};

AbstractPerson.prototype.decreaseGoodsCount = function (goodsCount) {
  return this._goods.decreaseCount(goodsCount);
};

AbstractPerson.prototype.getGoodsCount = function () {
  return this._goods.getCount();
};

