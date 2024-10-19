import { staggerObjectOptional } from '../utils/stagger/type';

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
    data: Record<string, number>;
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

export type tweenSetData = (arg0: Record<string, number>) => void;

export type tweenGoTo = (
    obj: Record<string, number | (() => number)>,
    props: tweenAction
) => void | Promise<any>;

export type tweenGoFrom = (
    obj: Record<string, number | (() => number)>,
    props: tweenAction
) => void | Promise<any>;

export type tweenGoFromTo = (
    fromObj: Record<string, number | (() => number)>,
    toObj: Record<string, number | (() => number)>,
    props: tweenAction
) => void | Promise<any>;

export type tweenSet = (
    obj: Record<string, number | (() => number)>,
    props: tweenAction
) => void | Promise<any>;

export type tweenDoAction = (
    data: (goToParamsType | goFromType | goFromToType)[],
    props: tweenAction,
    obj: Record<string, number | (() => number)>
) => void | Promise<any>;

export type tweenMergeProps = (props: tweenAction) => tweenDefault;
