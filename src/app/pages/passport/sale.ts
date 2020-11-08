export class Sale {

    constructor() { }

    getSales(): number {
        return Math.random() * (999 - 10000) + 100000;
    }
}
