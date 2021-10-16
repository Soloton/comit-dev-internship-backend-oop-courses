export class Period {
  _data;

  constructor(height) {
    this._data = new Array(height).fill(0);
  }

  getSum(value) {
    this._data.shift();
    this._data.push(value);
    return this._data.reduce((sum, a) => sum + a, 0);
  }
}
