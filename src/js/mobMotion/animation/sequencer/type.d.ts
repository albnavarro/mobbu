import { easeTypes } from '../tween/type';
import { staggerObjectOptional } from '../utils/stagger/type';
import { directionType } from '../utils/timeline/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface sequencerProps {
    data: valueToparseType<any>;
    duration?: number;
    stagger?: staggerObjectOptional;
    ease?: easeTypes;
}

export interface sequencerDefault {
    ease: easeTypes;
    start: number;
    end: number;
}

export interface sequencerAction {
    duration?: number;
    ease?: easeTypes;
    start?: number;
    end?: number;
}

export interface sequencerValue {
    active: boolean;
    currentValue: number;
    ease: () => void;
    fromValue: number;
    prop: string;
    settled: boolean;
    toValue: number;
}

export type propToFind = 'toValue' | 'fromValue' | '';

export interface sequencerRow {
    start: number;
    end: number;
    priority: number;
    values: sequencerValue[];
    propToFind: propToFind;
}

export interface createStagger {
    start: number;
    end: number;
    index: number;
    item: HTMLElement | object;
}

export interface labelType {
    name: string;
    time: number;
}

export interface addType {
    fn: (arg0: {
        direction: directionType;
        value: number;
        isForced: boolean;
    }) => void;
    time: number;
}

export interface masterSequencerItem {
    draw: (arg0: {
        partial: number;
        isLastDraw: boolean;
        useFrame: boolean;
    }) => void;
    inzializeStagger: () => void;
    setDuration: (arg0: number) => void;
    getDuration: () => number;
    setStretchFactor: (arg0: number) => void;
    getLabels: () => string;
    disableStagger: () => void;
    resetLastValue: () => void;
    cleanCachedId: () => void;
    destroy: () => void;
}

export interface createSequencerType {
    items: Array<HTMLElement | object>;
    duration?: number;
}
