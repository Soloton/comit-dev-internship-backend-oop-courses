import { Manufacturer } from "./manufacturer.js";
import { Consumer } from "./consumer.js";
import { AbstractPerson } from "./abstractPerson.js";

export class Delivery extends AbstractPerson {
  transport(manufacturer, consumer) {
    if (
      !(manufacturer instanceof Manufacturer) ||
      !(consumer instanceof Consumer)
    ) {
      return NaN;
    }

    const consumerGoods = consumer.getGoodsCount();

    const manufacturerGoods = manufacturer.getGoodsCount();

    const transportGoods = Math.min(100, consumerGoods, manufacturerGoods);

    manufacturer.decreaseGoodsCount(transportGoods);

    consumer.increaseGoodsCount(transportGoods);

    this.setGoodsCount(transportGoods);

    return transportGoods;
  }

  getEfficiency() {
    return this.getGoodsCount();
  }
}
