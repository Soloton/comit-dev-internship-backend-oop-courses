"use strict";

export function Period(height) {
  this._data = new Array(height).fill(0);

  this.getSum = function (value) {
    this._data.shift();
    this._data.push(value);
    return this._data.reduce(function (sum, a) {
      return sum + a;
    }, 0);
  };
}
