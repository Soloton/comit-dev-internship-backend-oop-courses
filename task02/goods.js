export class Goods {
  _count = 0;

  constructor(count) {
    this.setCount(count);
  }

  setCount(count) {
    if (count < 0) {
      throw Error(
        "It is impossible to pick up less goods than you have in stock"
      );
    }
    this._count = count;
  }

  getCount() {
    return this._count;
  }

  increaseCount(count) {
    this.setCount(this._count + count);
  }

  decreaseCount(count) {
    this.setCount(this._count - count);
  }
}
