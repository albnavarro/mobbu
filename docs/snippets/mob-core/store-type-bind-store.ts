interface Store2 {
    prop2: number;
}

interface StoreOne extends Readonly<Store2> {
    prop1: number;
    sum: number;
}
