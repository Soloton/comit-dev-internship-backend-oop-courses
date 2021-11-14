import { Industrial } from "./industrial";

export class Consumer extends Industrial {
    constructor() {
        super();
        super.setLimits(70, 120);
    }

    public getNeededGoodsCount(): number {
        return this._generateGoodsCount();
    }
}
