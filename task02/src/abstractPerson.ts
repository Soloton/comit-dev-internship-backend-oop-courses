import { Goods } from "./goods";

export abstract class AbstractPerson {
    protected goods = new Goods(0);

    public setGoodsCount(goodsCount: number): void {
        this.goods.setCount(goodsCount);
    }

    public increaseGoodsCount(goodsCount: number): void {
        return this.goods.increaseCount(goodsCount);
    }

    public decreaseGoodsCount(goodsCount: number): void {
        return this.goods.decreaseCount(goodsCount);
    }

    public getGoodsCount(): number {
        return this.goods.getCount();
    }
}
