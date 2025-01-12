import { CallbackObject } from '../callbacks/type.js';

export interface StaggerObject {
    /**
     * @description
     * Stagger type for createStagger
     */
    type: 'equal' | 'start' | 'end' | 'center';

    /**
     * @description
     * Interval between each stagger, the unit of measure is based on the single frame
     */
    each: number;

    /**
     * @description
     * Determines if the promise will be resolved by the fastest or slowest stagger, if the value is true the promise will be resolved by the slowest stagger
     */
    waitComplete: boolean;

    /**
     * @description
     * Determines the starting position of the stagger sequence, it can be an element of your choice (index: number), a string or an Object {x, y} in case a grid is used
     */
    from:
        | 'start'
        | 'end'
        | 'center'
        | 'edges'
        | 'random'
        | { x: number; y: number }
        | number;

    /**
     * @description
     * Grid object
     */
    grid: {
        col: number;
        row: number;
        direction: 'row' | 'col' | 'radial';
    };
}

export interface StaggerObjectOptional {
    /**
     * @description
     * Stagger type for createStagger
     */
    type?: 'equal' | 'start' | 'end' | 'center';

    /**
     * @description
     * Interval between each stagger, the unit of measure is based on the single frame
     */
    each?: number;

    /**
     * @description
     * Determines if the promise will be resolved by the fastest or slowest stagger, if the value is false the promise will be resolved by the slowest stagger
     */
    waitComplete?: boolean;

    /**
     * @description
     * Determines the starting position of the stagger sequence, it can be an element of your choice (index: number), a string or an Object {x, y} in case a grid is used
     */
    from?:
        | 'start'
        | 'end'
        | 'center'
        | 'edges'
        | 'random'
        | { x: number; y: number }
        | number;

    /**
     * @description
     * Grid object
     */
    grid?: {
        col: number;
        row: number;
        direction: 'row' | 'col' | 'radial';
    };
}

export interface StaggerPropiertiesObject {
    stagger: StaggerObject;
}

export interface StaggerDefaultIndex {
    index: number;
    frame: number;
}

export type setStagger = <T extends any[], S extends any[]>(arg0: {
    arrayDefault: T;
    arrayOnStop: S;
    stagger: StaggerObject;
    slowlestStagger: StaggerDefaultIndex;
    fastestStagger: StaggerDefaultIndex;
}) => {
    staggerArray: CallbackArrayStagger<T> | [];
    staggerArrayOnComplete: CallbackArrayStagger<S> | [];
    fastestStagger: StaggerDefaultIndex;
    slowlestStagger: StaggerDefaultIndex;
};

/**
 * Map type.
 * Merge original callBackObject with stagger props: index && frame.
 * Set stagger return callbackObject updated
 * ( arrayDefault | arrayOnStop | createStagger )
 */
type CallbackArrayStagger<Type> = {
    [Property in keyof Type]: Type[Property] & StaggerDefaultIndex;
};

export type ShouldInizializzeStagger = (
    each: number,
    firstRun: boolean,
    arrayToCompare1: CallbackObject<any>[],
    arrayToCompare2: CallbackObject<any>[]
) => boolean | undefined;

export type GetStaggerArray = <C extends any[], D extends any[]>(
    callbackCache: C,
    callbackDefault: D
) => C | D;
