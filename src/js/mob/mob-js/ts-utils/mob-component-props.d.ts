import {
    MobStoreReturnType,
    MobStoreValidateState,
} from '../../mob-core/store/type';
import { BindEffectObject } from '../modules/bind-effetc/type';
import { BindEventsObject } from '../modules/bind-events/type';
import { DelegateEventObject } from '../modules/delegate-events/type';
import { ArrayElement, NotValue, OnlyStringKey } from './utils';

export type ExtractState<T> = T['state'];
export type ExtractMethods<T> = T['methods'];
export type ExtractRef<T> = T['ref'];

/**
 * BindProps explicit mode.
 */
interface BindPropsObject<T, R> {
    bind?: OnlyStringKey<ExtractState<T>>[];
    forceParent?: boolean;
    props: (
        arg0: ExtractState<T>,
        value: Record<string, any>,
        index: number
    ) => Partial<ExtractState<R>>;
}

/**
 * BindProps auto mode.
 */
type BindPropsFunction<R> = () => Partial<ExtractState<R>>;

/**
 * BindProps.
 */
export type PartialBindProps<T, R> = (
    arg0: BindPropsObject<T, R> | BindPropsFunction<R>
) => string;

/**
 * DelegateEvents
 */
export type PartialDelegateEvents = (
    arg0: DelegateEventObject | DelegateEventObject[]
) => any;

/**
 * BindEvents
 */
export type PartialBindEvents = (
    arg0: BindEventsObject | BindEventsObject[]
) => void;

/**
 * BindClass
 */
export type PartialBindEffect<T> = (
    arg0: BindEffectObject<T> | BindEffectObject<T>[]
) => string;

/**
 * GetState
 */
export type PartialGetState<T> = () => ExtractState<T>;

/**
 * SetState
 */
interface PartialSetState<T> {
    <K extends keyof ExtractState<T>>(
        prop: K,
        value: ExtractState<T>[K],
        options?: {
            emit?: boolean;
        }
    ): void;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(
        prop: () => K,
        value: NoInfer<K>,
        options?: {
            emit?: boolean;
        }
    ): void;
}

/**
 * UpdateState
 */
interface PartialUpdateState<T> {
    <K extends keyof ExtractState<T>>(
        prop: K,
        value: (arg0: ExtractState<T>[K]) => Partial<ExtractState<T>[K]>,
        options?: {
            emit?: boolean;
            clone?: boolean;
        }
    ): void;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(
        prop: () => K,
        value: (arg0: K) => NoInfer<K>,
        options?: {
            emit?: boolean;
            clone?: boolean;
        }
    ): void;
}

/**
 * Get proxi function
 */
export type PartialGetProxi<T> = () => ExtractState<T>;

/**
 * Get proxi state
 */
export type PartialGetProxiState<T> = ExtractState<T>;

/**
 * SetStateByName
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
 * UpdateStetByName
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
 * Emit
 */
interface PartialEmit<T> {
    <K extends keyof ExtractState<T>>(prop: K): void;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(prop: () => K): void;
}

/**
 * EmitAsync
 */
interface PartialEmitAsync<T> {
    <K extends keyof ExtractState<T>>(prop: K): Promise<{ success: boolean }>;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(
        prop: () => K
    ): Promise<{ success: boolean }>;
}

/**
 * Computed
 */
export interface PartialCompunted<T> {
    <K extends keyof ExtractState<T>>(
        prop: K,
        callback: (arg0: ExtractState<T>) => ExtractState<T>[K],
        keys?: NotValue<keyof ExtractState<T>, K>[]
    ): void;
    <K extends T[keyof ExtractState<T>]>(
        prop: () => K,
        callback: (arg0: ExtractState<T>) => NoInfer<K>,
        keys?: NotValue<keyof ExtractState<T>, K>[]
    ): void;
}

/**
 * Watch
 */
export interface PartialWatch<T> {
    <K extends keyof ExtractState<T>>(
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
    ): () => void;
    <K extends T[keyof ExtractState<T>]>(
        prop: () => K,
        callback: (
            current: K,
            previous: K,
            validate: MobStoreValidateState
        ) => void,
        options?: { wait?: boolean; immediate?: boolean }
    ): () => void;
}

/**
 * BindStore
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
 * GetChildren
 */
export type PartialGetChildren = (componentName: string) => string[];

/**
 * FreezeProp
 */
export type PartialFreezeProp<T> = (prop: keyof ExtractState<T>) => void;

/**
 * UnFreezeProp
 */
export type PartialUnFreezeProp<T> = (prop: keyof ExtractState<T>) => void;

/**
 * GetParentId
 */
export type PartialGetParentId = () => string | undefined;

/**
 * Current repeat proxi value
 */
export interface PartialCurrent<T, K> {
    index: number;
    value: ArrayElement<ExtractState<T>[K]>;
}

export interface PartialCurrentProxi<K> {
    index: number;
    value: ArrayElement<K>;
}

/**
 * WatchParent
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
 * OnMount
 */
export type PartialOnMount = (
    arg0: (arg1: {
        element: HTMLElement;
    }) => void | (() => void) | Promise<(() => void) | undefined | void>
) => void;

/**
 * Repeat
 */
interface PartialRepeat<T> {
    <K extends keyof ExtractState<T> & string>(arg0: {
        /**
         * Clean previous item.
         */
        clean?: boolean;

        /**
         * Array of object used to create list
         */
        bind: K;

        /**
         * Unique key used to track the mutation of each individual component.
         */
        key?: string | undefined;

        /**
         * Add manually sync attributes to repeater child.
         */
        useSync?: boolean;

        /**
         * Function fired before update
         *
         * @example
         *     ${repeat({
         *     beforeUpdate: () => {
         *     ....
         *     },
         *     })}
         */
        beforeUpdate?(): Promise<void> | void;

        /**
         * Function fired after update
         *
         * @example
         *     ${repeat({
         *     afterUpdate: () => {
         *     ....
         *     },
         *     })}
         */
        afterUpdate?(): void;

        /**
         * Render child component.
         *
         * - Sync props is necessary (obbligatorie) for tracking key and store current and index value. this props can be
         *   used "ONCE".
         *
         * @example
         *     ```javascript
         *
         *     <div>
         *     ${repeat({
         *     ...
         *     render: ({ current }) => {
         *     return html`
         *     <my-component></my-component>
         *     `
         *     }
         *     })}
         *     </div>
         *
         *     ```
         */
        render: (arg0: {
            sync: () => string;
            initialIndex: number;
            initialValue: ArrayElement<ExtractState<T>[K]>;
            current: PartialCurrent<T, K>;
        }) => string;
    }): string;
    <K extends ExtractState<T>[keyof ExtractState<T>]>(arg0: {
        /**
         * Clean previous item.
         */
        clean?: boolean;

        /**
         * Array of object used to create list
         */
        bind: () => K;

        /**
         * Unique key used to track the mutation of each individual component.
         */
        key?: string | undefined;

        /**
         * Add manually sync attributes to repeater child.
         */
        useSync?: boolean;

        /**
         * Function fired before update
         *
         * @example
         *     ${repeat({
         *     beforeUpdate: () => {
         *     ....
         *     },
         *     })}
         */
        beforeUpdate?(): Promise<void> | void;

        /**
         * Function fired after update
         *
         * @example
         *     ${repeat({
         *     afterUpdate: () => {
         *     ....
         *     },
         *     })}
         */
        afterUpdate?(): void;

        /**
         * Render child component.
         *
         * - Sync props is necessary (obbligatorie) for tracking key and store current and index value. this props can be
         *   used "ONCE".
         *
         * @example
         *     ```javascript
         *
         *     <div>
         *     ${repeat({
         *     ...
         *     render: ({ current }) => {
         *     return html`
         *     <my-component></my-component>
         *     `
         *     }
         *     })}
         *     </div>
         *
         *     ```
         */
        render: (arg0: {
            sync: () => string;
            initialIndex: number;
            initialValue: ArrayElement<K>;
            current: PartialCurrentProxi<K>;
        }) => string;
    }): string;
}

/**
 * RemoveDom
 */
export type PartialRenderComponent = (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;

/**
 * Invalidate component
 */
interface PartialInvalidateComponent<T> {
    (arg0: {
        bind?:
            | OnlyStringKey<ExtractState<T>>[]
            | OnlyStringKey<ExtractState<T>>;
        beforeUpdate?(): Promise<void>;
        afterUpdate?(): void;
        render: () => string;
    }): string;
    (arg0: {
        bind?:
            | (() => ExtractState<T>[keyof ExtractState<T>])[]
            | (() => ExtractState<T>[keyof ExtractState<T>]);
        beforeUpdate?(): Promise<void>;
        afterUpdate?(): void;
        render: () => string;
    }): string;
}

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
 * Mapped type: Transform each propierties in array.
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
