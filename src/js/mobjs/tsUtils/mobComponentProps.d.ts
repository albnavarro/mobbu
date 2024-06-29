import { bindEventsObject } from '../temporaryData/bindEvents/type';
import { delegateEventObject } from '../temporaryData/weakBindEvents/type';
import { OnlyStringKey } from './utils';

/**
 * bindProps.
 */
export type PartialBindProps<T> = (arg0: {
    bind: Array<OnlyStringKey<T>>;
    forceParent?: boolean;
    props: (arg0: T & { _current: any; _index: number }) => {
        [key: string]: any;
    };
}) => string;

/**
 * delegateEvents
 */
export type PartialDelegateEvents = (
    arg0: delegateEventObject | delegateEventObject[]
) => any;

/**
 * bindEvents
 */
export type PartialBindEvents = (
    arg0: bindEventsObject | bindEventsObject[]
) => void;

/**
 * getState
 */
export type PartialGetState<T> = () => T;

/**
 * setState
 */
export type PartialSetState<T> = <K extends keyof T>(
    prop: K,
    value: T[K] | ((arg0: T[K]) => T[K]),
    fireCallback?: boolean,
    clone?: boolean
) => void;
