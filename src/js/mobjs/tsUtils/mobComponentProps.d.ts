import { MobStoreReturnType } from '../../mobCore/store/type';
import { BindEffectObject } from '../modules/bindEffect/type';
import { BindEventsObject } from '../modules/bindEvents/type';
import { DelegateEventObject } from '../modules/delegateEvents/type';
import { ArrayElement, NotValue, OnlyStringKey } from './utils';

export type ExtractState<T> = T['state'];
export type ExtractMethods<T> = T['methods'];
export type ExtractRef<T> = T['ref'];

/**
 * bindProps.
 */
export type PartialBindProps<T, R> = (arg0: {
    bind?: OnlyStringKey<ExtractState<T>>[];
    forceParent?: boolean;
    props: (
        arg0: ExtractState<T>,
        value: Record<string, any>,
        index: number
    ) => Partial<ExtractState<R>>;
}) => string;

/**
 * delegateEvents
 */
export type PartialDelegateEvents = (
    arg0: DelegateEventObject | DelegateEventObject[]
) => any;

/**
 * bindEvents
 */
export type PartialBindEvents = (
    arg0: BindEventsObject | BindEventsObject[]
) => void;

/**
 * bindClass
 */
export type PartialBindEffect<T> = (
    arg0: BindEffectObject<T> | BindEffectObject<T>[]
) => string;

/**
 * getState
 */
export type PartialGetState<T> = () => ExtractState<T>;

/**
 * setState
 */
export type PartialSetState<T> = <K extends keyof ExtractState<T>>(
    prop: K,
    value: ExtractState<T>[K],
    options?: {
        emit?: boolean;
    }
) => void;

/**
 * afterState
 */
export type PartialUpdateState<T> = <K extends keyof ExtractState<T>>(
    prop: K,
    value: (arg0: ExtractState<T>[K]) => Partial<ExtractState<T>[K]>,
    options?: {
        emit?: boolean;
        clone?: boolean;
    }
) => void;

/**
 * get proxi function
 */
export type PartialGetProxi<T> = () => ExtractState<T>;

/**
 * get proxi state
 */
export type PartialGetProxiState<T> = ExtractState<T>;

/**
 * setStateByName
 */
export type PartialSetStateByName<T> = <K extends keyof ExtractState<T>>(
    prop: K,
    value: ExtractState<T>[K],
    options?: {
        emit?: boolean;
        clone?: boolean;
    }
) => void;

/**
 * updateStetByName
 */
export type PartialUpdateStateByName<T> = <K extends keyof ExtractState<T>>(
    prop: K,
    value: (arg0: ExtractState<T>[K]) => ExtractState<T>[K],
    options?: {
        emit?: boolean;
        clone?: boolean;
    }
) => void;

/**
 * emit
 */
export type PartialEmit<T> = (prop: keyof ExtractState<T>) => void;

/**
 * emitAsync
 */
export type PartialEmitAsync<T> = (
    prop: keyof ExtractState<T>
) => Promise<{ success: boolean }>;

/**
 * computed
 */
export type PartialCompunted<T> = <K extends keyof ExtractState<T>>(
    prop: K,
    keys: NotValue<keyof ExtractState<T>, K>[],
    callback: (arg0: ExtractState<T>) => ExtractState<T>[K],
    options?: { immediate?: boolean }
) => void;

/**
 * watch
 */
export type PartialWatch<T> = <K extends keyof ExtractState<T>>(
    prop: K,
    callback: (
        current: ExtractState<T>[K],
        previous: ExtractState<T>[K],
        validate: boolean
    ) => void,
    options?: {
        wait?: boolean;
        immediate?: boolean;
    }
) => () => void;

/**
 * bindStore
 */
export type PartialBindStore = (
    value: MobStoreReturnType<any> | MobStoreReturnType<any>[]
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
export type PartialGetChildren = (componentName: string) => string[];

/**
 * freezeProp
 */
export type PartialFreezeProp<T> = (prop: keyof ExtractState<T>) => void;

/**
 * unFreezeProp
 */
export type PartialUnFreezeProp<T> = (prop: keyof ExtractState<T>) => void;

/**
 * getParentId
 */
export type PartialGetParentId = () => string | undefined;

/**
 * Current repeat proxi value
 */

export interface PartialCurrent<T, K> {
    index: number;
    value: ArrayElement<ExtractState<T>[K]>;
}

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
export type PartialRepeat<T> = <
    K extends keyof ExtractState<T> & string,
>(arg0: {
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
    bind: K;

    /**
     * @description
     * Unique key used to track the mutation of each individual component.
     */
    key?: string | undefined;

    /**
     * @description
     * Add manually sync attributes to repeater child.
     */
    useSync?: boolean;

    /**
     * @description
     * Function fired before update
     *
     * @example
     *
     * ${repeat({
     *     beforeUpdate: () => {
     *         ....
     *     },
     * })}
     */
    beforeUpdate?(): Promise<void> | void;

    /**
     * @description
     * Function fired after update
     *
     * @example
     *
     * ${repeat({
     *     afterUpdate: () => {
     *         ....
     *     },
     * })}
     */
    afterUpdate?(): void;

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
        initialIndex: number;
        initialValue: ArrayElement<ExtractState<T>[K]>;
        current: PartialCurrent<T, K>;
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
    bind?: OnlyStringKey<ExtractState<T>>[] | OnlyStringKey<ExtractState<T>>;
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
export type PartialStaticProps<R> = (arg0: Partial<ExtractState<R>>) => string;

/**
 * Methods
 */
export type PartialMethods<T> = <
    K extends keyof Record<string & keyof ExtractMethods<T>, function>,
>(
    name: K,
    fn: ExtractMethods<T>[K]
) => void;

export type PartialUseMethodByName<T> = ExtractMethods<T>;

/**
 * Mapped type:
 * Transform each propierties in array.
 */
type RefToArray<Type> = {
    [Property in keyof Type]: Type[Property][];
};

/**
 * Bind refs
 */
export type PartialSetRef<T> = (arg0: OnlyStringKey<ExtractRef<T>>) => string;
export type PartialGetRef<T> = () => ExtractRef<T>;
export type PartialGetRefs<T> = () => RefToArray<ExtractRef<T>>;
export type PartialBindText = (TemplateStringsArray, ...any) => string;
export type PartialReturnBindProps<T> = Partial<ExtractState<T>>;
