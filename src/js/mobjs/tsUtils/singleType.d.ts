import { NotValue, OnlyStringKey } from './utils';

/**
 * GetState
 */
export type GetStateRecord<T> = {
    [P in keyof T]: T[P];
};

/**
 * Set State
 */
export type SetStateRecord<T> = {
    [P in keyof T]: (
        prop: P,
        value: T[P],
        fireCallback?: boolean,
        clone?: boolean
    ) => void;
};

/**
 * WatchSync
 */
export type WatchRecord<T> = {
    [P in keyof T]: (prop: P, callback: (arg0: T[P]) => void) => void;
};

/**
 * @description
 * Computed
 * TODO: arg: any, se viene buttato fuori come oggetto,
 * Posso usare la tecnica di BInd props con un Union... innestato.
 *
 */
export type ComputedRecord<T> = {
    [P in keyof T]: (
        prop: P,
        keys: Array<NotValue<keyof T, P>>,
        callback: (arg0: T) => T[P]
    ) => void;
};

/**
 * Bind Props
 */
export type BindPropsRecord<T> = (arg0: {
    bind: Array<OnlyStringKey<T>>;
    forceParent?: boolean;
    props: (arg0: T & { _current: any; _index: number }) => {
        [key: string]: any;
    };
}) => string;
