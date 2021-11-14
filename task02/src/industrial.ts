import { Goods } from "./goods";
import { AbstractPerson } from "./abstractPerson";

export class Industrial extends AbstractPerson {
    private minimum: number = 0;
    private maximum: number = 0;

    constructor() {
        super();
        this.goods = new Goods(0);
    }

    public static getRandomNumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    public setLimits(min: number, max: number): void {
        this.minimum = min;
        this.maximum = max;
    }

    _generateGoodsCount(): number {
        const goodsNumber = Industrial.getRandomNumber(
            this.minimum,
            this.maximum
        );
        this.increaseGoodsCount(goodsNumber);
        return new Goods(goodsNumber).getCount();
    }
}
