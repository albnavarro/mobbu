import { springChoiceConfig, springProps } from '../spring/type';
import { easeTypes, tweenCommonProps } from '../tween/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface asyncTimelineType {
    /**
     * @description
     * Reverse the direction each time the animation ends.
     */
    yoyo?: boolean;

    /**
     * @description
     * How many times the animation should be repeated.
     * -1 means that the animation will run in an infinite loop.
     */
    repeat?: number;

    /**
     * @description
     * By default when a play or a playReverse is performed a `set method` is executed on each tween using the `initial values` (play)
     * or the `final values` (playReverse) to make each tween start from a 'neutral' position regardless of its value current.
     * Sets are not saved in the timeline but are temporary.
     * If the `freeMode` property is set to `true` the sets are not executed so that multiple timelines can control the same tweens always starting from the current value of each tween. `The default is false`.
     */
    freeMode?: boolean;

    /**
     * @description
     * If `autoSet` is set to true for each tween a `set method` corresponding to the `beginning` and `end` of the same timeline will be created.
     * The newly created methods will be `permanently` added to the ends of the timeline.
     * As these sets are permanent unlike the default behavior (with freeMode = false) during a repeat the timeline will always restart from the initial (or final) value.
     * `The default is false`
     */
    autoSet?: boolean;
}

export interface asyncTimelineTypeSpecialProps {
    ease?: easeTypes;
    duration?: number;
    config?: springChoiceConfig;
    configProp?: springProps;
    precision?: number;
    velocity?: number;
    reverse?: boolean;
    relative?: boolean;
    delay?: number;
    immediate?: boolean;
    immediateNoPromise?: boolean;
}

export interface asyncTimelineTween {
    getId: () => string;
    set: (arg0: valueToparseType<any>, ar1?: tweenCommonProps) => Promise<any>;
    goTo: () => Promise<any>;
    goFromTo: () => Promise<any>;
    getToNativeType: () => any;
    destroy: () => void;
    onStartInPause: () => void;
    resetData: () => void;
    getInitialData: () => any;
    stop: (arg0: { clearCache: boolean }) => any;
    pause?: () => void;
    resume?: () => void;
}

export interface asyncTimelineRowData {
    action: string;
    groupProps: {
        waitComplete?: boolean;
    };
    id: number;
    labelProps: { name?: string };
    prevValueSettled: boolean;
    prevValueTo: valueToparseType<any>;
    syncProp: {
        from: asyncTimelineTween;
        to: asyncTimelineTween;
    };
    tween: any;
    tweenProps: asyncTimelineTypeSpecialProps;
    valuesFrom: valueToparseType<any>;
    valuesTo: valueToparseType<any>;
}

export interface asyncTimelineTweenItem {
    data: asyncTimelineRowData;
    group: number | undefined;
}

export interface asyncTimelineCurrentTween {
    uniqueId: string;
    id: number;
    tween: asyncTimelineTween;
}

export interface syncTimelineTweenStore {
    id: string;
    tween: asyncTimelineTween;
}

export interface asyncTimelineLabelState {
    active: boolean;
    index: string | number | null;
    isReverse: boolean;
}

export interface asyncTimelineStarterFunction {
    fn: () => any;
    active: boolean;
}

export interface asyncTimelineAfterReject {
    fn: () => any;
    active: boolean;
}

export interface asyncTimelineCurrentAction {
    action: string;
    id: number;
}
