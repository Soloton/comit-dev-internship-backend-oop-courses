export class Period {
    private _data: Array<number>;

    constructor(height: number) {
        this._data = new Array(height).fill(0);
    }

    public getSum(value: number): number {
        this._data.shift();
        this._data.push(value);
        return this._data.reduce((sum, a) => sum + a, 0);
    }
}
