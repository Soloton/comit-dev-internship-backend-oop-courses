"use strict";

export function Goods(goodsCount) {
  this.setCount = function (count) {
    if (count < 0) {
      throw Error(
        "It is impossible to pick up less goods than you have in stock"
      );
    }
    this._count = count;
  };

  this.getCount = function () {
    return this._count;
  };

  this.increaseCount = function (count) {
    this.setCount(this._count + count);
  };

  this.decreaseCount = function (count) {
    this.setCount(this._count - count);
  };

  this.setCount(goodsCount);
}
