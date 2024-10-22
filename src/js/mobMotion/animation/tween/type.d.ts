import { staggerObjectOptional } from '../utils/stagger/type';
import { allActionType } from '../utils/tweenAction/type';

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
    props?: tweenAction
) => ReturnType<tweenDoAction>;

export type tweenGoFrom = (
    obj: Record<string, number | (() => number)>,
    props?: tweenAction
) => ReturnType<tweenDoAction>;

export type tweenGoFromTo = (
    fromObj: Record<string, number | (() => number)>,
    toObj: Record<string, number | (() => number)>,
    props?: tweenAction
) => ReturnType<tweenDoAction>;

export type tweenSet = (
    obj: Record<string, number | (() => number)>,
    props?: tweenAction
) => ReturnType<tweenDoAction>;

export type tweenDoAction = (
    data: allActionType[],
    props?: tweenAction,
    obj: Record<string, number | (() => number)>
) => any | Promise<void>;

export type tweenMergeProps = (props: tweenAction) => tweenDefault;

export type tweenStop = (arg0?: tweenStopProps) => void;
export type tweenPause = () => void;
export type tweenResume = () => void;
export type tweenResetData = () => void;
export type tweenGetValue = () => Record<string, number>;
export type tweenGetValueNative = () => Record<string, number | (() => number)>;
export type tweenGetType = () => string;
export type tweenGetId = () => string;
export type tweenUpdateEase = (arg0: easeTypes) => void;
export type tweenSubscribe = (cb: () => void) => () => void;
export type tweenSubscribeCache = (
    item: object | HTMLElement,
    cb: (arg0: Record<string, number>) => void
) => () => void;
export type tweenOnComplete = (cb: () => void) => () => void;
