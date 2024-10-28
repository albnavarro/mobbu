import { tweenStopProps } from '../tween/type';
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

export type lerpMergeProps = (props: lerpActions) => lerpDefault;
export type lerpStop = (arg0?: tweenStopProps) => void;
export type lerpPause = () => void;
export type lerpResume = () => void;
export type lerpResetData = () => void;
export type lerpGetValue = () => Record<string, number>;
export type lerpGetValueNative = () => Record<string, number | (() => number)>;
export type lerpGetType = () => string;
export type lerpGetId = () => string;
export type lerpUpdateVelocity = (number) => void;
export type lerpUpdatePrecision = (number) => void;
export type lerpSubscribe = (cb: () => void) => () => void;
export type lerpSubscribeCache = (
    item: object | HTMLElement,
    cb: (arg0: Record<string, number>) => void
) => () => void;
export type lerpOnComplete = (cb: () => void) => () => void;
