import { Industrial } from "./industrial";

export class Manufacturer extends Industrial {
    constructor() {
        super();
        this.setLimits(50, 150);
    }

    public getGeneratedGoodsCount(): number {
        return this._generateGoodsCount();
    }
}
