import { staggerObjectOptional } from '../utils/stagger/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface springProps {
    friction: number;
    mass: number;
    precision: number;
    tension: number;
    velocity: number;
}

export interface springPropsOptional {
    friction?: number;
    mass?: number;
    precision?: number;
    tension?: number;
    velocity?: number;
}

export interface springPresentConfigType {
    gentle?: springProps;
    wobbly?: springProps;
    bounce?: springProps;
    scroller?: springProps;
    default?: springProps;
    [key: string]: springProps;
}

export type springChoiceConfig =
    | 'default'
    | 'gentle'
    | 'wobbly'
    | 'bounce'
    | 'scroller';

export interface springTweenProps {
    data: valueToparseType<any>;
    relative?: boolean;
    stagger?: staggerObjectOptional;
    config?: springChoiceConfig;
    configProp?: springPropsOptional;
}

export interface springActions {
    reverse?: boolean;
    relative?: boolean;
    immediate?: boolean;
    immediateNoPromise?: boolean;
    config?: springChoiceConfig;
    configProp?: springPropsOptional;
}

export interface springDefault {
    reverse: boolean;
    configProps: springProps;
    relative: boolean;
    immediate: boolean;
    immediateNoPromise: boolean;
}

export interface springInitialData {
    prop: string;
    toValue: number;
    fromValue: number;
    currentValue: number;
}

export interface springValues extends springInitialData {
    velocity: number;
    fromFn: () => number;
    fromIsFn: boolean;
    toFn: () => number;
    toIsFn: boolean;
    settled: boolean;
}
