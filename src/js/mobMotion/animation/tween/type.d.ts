import { staggerObjectOptional } from '../utils/stagger/type';
import { valueToparseType } from '../utils/tweenAction/type';

export type easeTypes =
    | 'easeLinear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInOutSine'
    | 'easeInExpo'
    | 'easeOutExpo'
    | 'easeInOutExpo'
    | 'easeInCirc'
    | 'easeOutCirc'
    | 'easeInOutCirc'
    | 'easeInElastic'
    | 'easeOutElastic'
    | 'easeInOutElastic'
    | 'easeInBack'
    | 'easeOutBack'
    | 'easeInOutBack'
    | 'easeInBounce'
    | 'easeOutBounce'
    | 'easeInOutBounce';

export interface tweenProps {
    data: valueToparseType<any>;
    duration?: number;
    relative?: boolean;
    stagger?: staggerObjectOptional;
    ease?: easeTypes;
}

export interface tweenCommonProps {
    reverse?: boolean;
    relative?: boolean;
    immediate?: boolean;
    immediateNoPromise?: boolean;
}

export interface tweenCommonPropsTween extends tweenCommonProps {
    duration?: number;
}

export interface tweenAction {
    duration?: number;
    reverse?: boolean;
    relative?: boolean;
    immediate?: boolean;
    immediateNoPromise?: boolean;
    ease?: easeTypes;
}

export interface tweenDefault {
    duration: number;
    ease: string;
    relative: boolean;
    reverse: boolean;
    immediate: boolean;
    immediateNoPromise: boolean;
}

export interface tweenStopProps {
    clearCache?: boolean;
}

export interface tweenInitialData {
    prop: string;
    toValue: number;
    fromValue: number;
    currentValue: number;
    shouldUpdate: boolean;
    fromFn: () => number;
    fromIsFn: boolean;
    toFn: () => number;
    toIsFn: boolean;
    settled: boolean;
}

export interface tweenStoreData extends tweenInitialData {
    toValueOnPause: number | (() => number);
    toValProcessed: number | (() => number);
}
