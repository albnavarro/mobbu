import { staggerObjectOptional } from '../utils/stagger/type';

export interface lerpTweenProps {
    data: Record<string, number>;
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
