export class Goods {
    private _count: number = 0;

    constructor(count: number) {
        this.setCount(count);
    }

    public setCount(count: number): void {
        if (count < 0) {
            throw Error(
                "It is impossible to pick up less goods than you have in stock"
            );
        }
        this._count = count;
    }

    public getCount(): number {
        return this._count;
    }

    public increaseCount(count: number): void {
        this.setCount(this._count + count);
    }

    public decreaseCount(count: number): void {
        this.setCount(this._count - count);
    }
}
