import { Goods } from "./goods.js";
import { AbstractPerson } from "./abstractPerson.js";

export class Industrial extends AbstractPerson {
  _minimum;
  _maximum;

  constructor() {
    super();
    this._goods = new Goods(0);
  }

  static getRandomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  setLimits(min, max) {
    this._minimum = min;
    this._maximum = max;
  }

  _generateGoodsCount() {
    const goodsNumber = Industrial.getRandomNumber(
      this._minimum,
      this._maximum
    );
    this.increaseGoodsCount(goodsNumber);
    return new Goods(goodsNumber).getCount();
  }
}
