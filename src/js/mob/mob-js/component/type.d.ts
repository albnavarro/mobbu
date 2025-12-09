import {
    MobStoreComputed,
    MobStoreEmitAsync,
    MobStoreEmit,
    MobStoreGet,
    MobStoreParams,
    MobStoreSet,
    MobStoreUpdate,
    MobStoreWatch,
    MobStoreReturnType,
    MobStoreStoreProxi,
    BindStoreValueType,
} from '../../mob-core/store/type';
import { UserComponent } from '../web-component/type';

export interface ComponentCommon {
    key: string;
    currentRepeaterState?: {
        current: object;
        index: number;
    };
    repeaterInnerWrap?: HTMLElement | Element | undefined;
    repeatPropBind?: string;
    repeaterContextId?: string;
    componentRepeatId?: string;
    parentPropsWatcher?: (() => void)[];
    destroy?: () => void;
    freezedPros?: string[];
    persistent: boolean;
    child?: Record<string, string[]>;
    parentId: string | undefined;
    id: string;
}

export interface ComponentStore extends ComponentCommon {
    element: HTMLElement | UserComponent;
    componentName: string;
    instanceName: string;
    state: MobStoreReturnType<any>;
    refs: Record<string, HTMLElement[]>;
    methods: Record<string, (...args: any[]) => void> | object;
}

export interface ComponentStoreInput extends ComponentCommon {
    componentName: string;
    element: HTMLElement | UserComponent;
    instanceName: string;
    state: MobStoreParams;
    bindStore?: BindStoreValueType;
    props: object;
    refs?: Record<string, HTMLElement[]>;
    methods?: Record<string, (...args: any[]) => void> | object;
}

export interface ComponentStoreReturn {
    getState: MobStoreGet;
    setState: MobStoreSet;
    updateState: MobStoreUpdate;
    getProxi: MobStoreStoreProxi;
    emit: MobStoreEmit;
    emitAsync: MobStoreEmitAsync;
    computed: MobStoreComputed;
    watch: MobStoreWatch;
    debug: () => void;
}

export interface ComponentMapWrapper {
    get: (key: string) => import('./type').ComponentStore | undefined;
    set: (
        key: string,
        value: import('./type').ComponentStore
    ) => ComponentMapWrapper;
    delete: (key: string) => boolean;
    has: (key: string) => boolean;
    clear: () => void;
    size: number;
    entries: () => IterableIterator<[string, import('./type').ComponentStore]>;
    keys: () => IterableIterator<string>;
    values: () => IterableIterator<import('./type').ComponentStore>;
    forEach: (
        callback: (value: import('./type').ComponentStore, key: string) => void
    ) => void;
    compact: () => void;
}
