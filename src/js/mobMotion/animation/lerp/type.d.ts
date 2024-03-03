import { staggerObjectOptional } from '../utils/stagger/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface lerpTweenProps {
    data: valueToparseType<any>;
    relative?: boolean;
    stagger?: staggerObjectOptional;
    precision?: number;
    velocity?: number;
}

export interface lerpActions {
    reverse?: boolean;
    relative?: boolean;
    immediate?: boolean;
    immediateNoPromise?: boolean;
    precision?: number;
    velocity?: number;
}

export interface lerpDefault {
    reverse: boolean;
    velocity: number;
    precision: number;
    relative: boolean;
    immediate: boolean;
    immediateNoPromise: boolean;
}

export interface lerpInitialData {
    prop: string;
    toValue: number;
    fromValue: number;
    currentValue: number;
}

export interface lerpValues extends lerpInitialData {
    fromFn: () => number;
    fromIsFn: boolean;
    toFn: () => number;
    toIsFn: boolean;
    settled: boolean;
}
