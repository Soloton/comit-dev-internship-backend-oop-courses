// @ts-ignore
import { Manufacturer } from "./manufacturer";
import { Consumer } from "./consumer";
import { AbstractPerson } from "./abstractPerson";

export class Delivery extends AbstractPerson {
    public transport(manufacturer: Manufacturer, consumer: Consumer): number {
        const consumerGoods: number = consumer.getGoodsCount();

        const manufacturerGoods: number = manufacturer.getGoodsCount();

        const transportGoods: number = Math.min(
            100,
            consumerGoods,
            manufacturerGoods
        );

        manufacturer.decreaseGoodsCount(transportGoods);

        consumer.increaseGoodsCount(transportGoods);

        this.setGoodsCount(transportGoods);

        return transportGoods;
    }

    public getEfficiency(): number {
        return this.getGoodsCount();
    }
}
