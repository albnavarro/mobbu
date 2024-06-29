import { bindEventsObject } from '../temporaryData/bindEvents/type';
import { delegateEventObject } from '../temporaryData/weakBindEvents/type';
import { NotValue, OnlyStringKey } from './utils';

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

/**
 * emit
 */
export type PartialEmit<T> = (prop: keyof T) => void;

/**
 * emitAsync
 */
export type PartialEmitAsync<T> = (
    prop: keyof T
) => Promise<{ success: boolean }>;

/**
 * computed
 */
export type PartialCompunted<T> = <K extends keyof T>(
    prop: K,
    keys: Array<NotValue<keyof T, K>>,
    callback: (arg0: T) => T[K]
) => void;

/**
 * watch
 */
export type PartialWatch<T> = <K extends keyof T>(
    prop: K,
    callback: (arg0: T[K]) => void
) => void;

/**
 * RemoveDom
 */
export type PartialRemoveDOM = (element: HTMLElement) => void;

/**
 * Remove
 */
export type PartialRemove = () => void;

/**
 * getChildren
 */
export type PartialGetChildren = (componentName: string) => Array<string>;

/**
 * freezeProp
 */
export type PartialFreezeProp<T> = (prop: keyof T) => void;

/**
 * unFreezeProp
 */
export type PartialUnFreezeProp<T> = (prop: keyof T) => void;

/**
 * getParentId
 */
export type PartialGetParentId = () => string | undefined;

/**
 * watchParent
 */
export type PartialWatchParent = (
    prop: string,
    callback: (arg0: any) => void
) => void;

/**
 * Unbind
 */
export type PartialUnBind = () => void;

/**
 * onMount
 */
export type PartialOnMount = (
    arg0: (arg1: {
        element: HTMLElement;
        refs: { [key: string]: HTMLElement | HTMLElement[] };
    }) => (() => void) | Promise<() => void> | undefined
) => void;

/**
 * repeat
 */
export type PartialRepeat<T> = (arg0: {
    /**
     * @description
     * Clean previous item.
     */
    clean?: boolean;

    /**
     * @description
     * Array of object used to create list
     */
    watch: OnlyStringKey<T>;

    /**
     * @description
     * Unique key used to track the mutation of each individual component.
     */
    key?: string | undefined;

    /**
     * @description
     * Function fired before update
     *
     * @example
     *
     * ${repeat({
     *     beforeUpdate: ({ container, childrenId }) => {
     *         ....
     *     },
     * })}
     */
    beforeUpdate?(arg0: {
        /**
         * @description
         * Main component
         */
        element: HTMLElement;

        /**
         * @description
         * List container element.
         */
        container: HTMLElement;

        /**
         * @description
         * Active Children ids
         */
        childrenId: string[];
    }): void;

    /**
     * @description
     * Function fired after update
     *
     * @example
     *
     * ${repeat({
     *     afterUpdate: ({ container, childrenId }) => {
     *         ....
     *     },
     * })}
     */
    afterUpdate?(arg0: {
        /**
         * @description
         * Main component
         */
        element: HTMLElement;

        /**
         * @description
         * List container element.
         */
        container: HTMLElement;

        /**
         * @description
         * New Children ids
         */
        childrenId: string[];
    }): void;

    /**
     * @description
     * Render child component.
     *
     * - sync props is necessary (obbligatorie) for tracking key and store current and index value.
     *   this props can be used "ONCE".
     *
     *
     * @example
     *
     * ```javascript
     *
     * <div>
     *     ${repeat({
     *         ...
     *         render: ({ sync, html }) => {
     *            return html`
     *                <my-component
     *                    ${sync} // !important
     *                    ${staticProps({
     *                        myState: value,
     *                    })}
     *                    ${bindProps({
     *                        bind: ['my_array_state', 'myState2'],
     *                        props: ({ myState2, _current, _index }) => {
     *                            return {
     *                                myState2,
     *                                label: _current.myValue,
     *                                index,
     *                            };
     *                        },
     *                    })}
     *                    ${bindEvents({
     *                        mousedown: (_e, { current, index }) =>
     *                            //
     *                    })}
     *                >
     *                </my-component>
     *            `
     *         }
     *     })}
     * </div>
     *
     * ```
     */
    render: (arg0: { sync: string; html?: (arg0: string) => string }) => string;
}) => string;

/**
 * RemoveDom
 */
export type PartialRenderComponent = (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;
