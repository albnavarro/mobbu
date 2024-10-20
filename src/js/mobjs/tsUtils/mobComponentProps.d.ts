import { bindEventsObject } from '../modules/bindEvents/type';
import { delegateEventObject } from '../modules/delegateEvents/type';
import { ArrayElement, NotValue, OnlyStringKey } from './utils';

/**
 * bindProps.
 */
export type PartialBindProps<T, R> = (arg0: {
    bind?: OnlyStringKey<T>[];
    forceParent?: boolean;
    props: (arg0: T, index: number) => Partial<R>;
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
    value: T[K],
    fireCallback?: boolean,
    clone?: boolean
) => void;

/**
 * afterState
 */
export type PartialUpdateState<T> = <K extends keyof T>(
    prop: K,
    value: (arg0: T[K]) => Partial<T[K]>,
    fireCallback?: boolean,
    clone?: boolean
) => void;

/**
 * setStateByName
 */
export type PartialSetStateByName<T> = <K extends keyof T>(
    prop: K,
    value: T[K],
    fireCallback?: boolean,
    clone?: boolean
) => void;

/**
 * updateStetByName
 */
export type PartialUpdateStateByName<T> = <K extends keyof T>(
    prop: K,
    value: (arg0: T[K]) => T[K],
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
    keys: NotValue<keyof T, K>[],
    callback: (arg0: T) => T[K]
) => void;

/**
 * watch
 */
export type PartialWatch<T> = <K extends keyof T>(
    prop: K,
    callback: (current: T[K], previous: T[K], validate: boolean) => void
) => () => void;

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
export type PartialGetChildren = (componentName: string) => string[];

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
    }) => void | (() => void) | Promise<(() => void) | undefined | void>
) => void;

/**
 * repeat
 */
export type PartialRepeat<T> = <K extends keyof T>(arg0: {
    /**
     * @description
     * Clean previous item.
     */
    clean?: boolean;

    /**
     * @description
     * Persistent element
     */
    persistent?: boolean;

    /**
     * @description
     * Array of object used to create list
     */
    bind: OnlyStringKey<T>;

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
    }): Promise<void> | void;

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
     *                        props: ({ myState2 }, index) => {
     *                        const { my_array_state } = getState();
     *
     *                            return {
     *                                myState2,
     *                                label: my_array_state[index].myValue,
     *                                index,
     *                            };
     *                        },
     *                    })}
     *                    ${bindEvents({
     *                        mousedown: (event, index) =>
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
    render: (arg0: {
        sync: () => string;
        index: number;
        currentValue: ArrayElement<T[K]>;
        html: (
            template: { raw: readonly string[] | ArrayLike<string> },
            ...substitutions: any[]
        ) => string;
    }) => string;
}) => string;

/**
 * RemoveDom
 */
export type PartialRenderComponent = (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
    persistent?: boolean;
}) => Promise<any>;

/**
 * Invalidate component
 */
export type PartialInvalidateComponent<T> = (arg0: {
    bind?: OnlyStringKey<T>[] | OnlyStringKey<T>;
    persistent?: boolean;
    beforeUpdate?(): Promise<void>;
    afterUpdate?(): void;
    render: (arg0: {
        html: (
            template: { raw: readonly string[] | ArrayLike<string> },
            ...substitutions: any[]
        ) => string;
    }) => string;
}) => string;

/**
 * StaticProps
 */
export type PartialStaticProps<R> = (arg0: Partial<R>) => string;

/**
 * Methods
 */
export type PartialMethods = (
    name: string,
    fn: (...args: any[]) => void
) => void;

/**
 * Bind refs
 */
export type PartialSetRef = (string) => string;
export type PartialGetRef = () => Record<string, HTMLElement>;
export type PartialGetRefs = () => Record<string, HTMLElement[]>;
export type PartialBindText = (TemplateStringsArray, ...any) => string;
