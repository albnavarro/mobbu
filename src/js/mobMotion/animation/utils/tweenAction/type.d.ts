export interface valueToparseType {
    string: number | (() => number);
}

export interface goToParamsType {
    prop: string;
    toValue: number;
    toFn: function;
    toIsFn: boolean;
    settled: boolean;
}

export interface goFromType {
    prop: string;
    fromValue: number;
    currentValue: number;
    fromFn: function;
    fromIsFn: boolean;
    settled: boolean;
}

export interface goFromToType {
    prop: string;
    fromValue: number;
    fromFn: function;
    fromIsFn: boolean;
    toValue: number;
    toFn: function;
    toIsFn: boolean;
    currentValue: number;
    settled: boolean;
}
