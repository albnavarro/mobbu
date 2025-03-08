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
    BindStore,
} from '../../mobCore/store/type';
import { UserComponent } from '../webComponent/type';

export interface componentCommonTypes {
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

export interface componentStoreTypes extends componentCommonTypes {
    element: HTMLElement | UserComponent;
    componentName: string;
    instanceName: string;
    state: MobStoreReturnType<any>;
    refs: Record<string, HTMLElement[]>;
    methods: Record<string, (...args: any[]) => void> | object;
}

export interface componentStoreInputTypes extends componentCommonTypes {
    componentName: string;
    element: HTMLElement | UserComponent;
    instanceName: string;
    state: MobStoreParams;
    props: object;
    refs?: Record<string, HTMLElement[]>;
    methods?: Record<string, (...args: any[]) => void> | object;
}

export interface componentStoreReturnType {
    getState: MobStoreGet;
    setState: MobStoreSet;
    updateState: MobStoreUpdate;
    getProxi: MobStoreStoreProxi;
    emit: MobStoreEmit;
    emitAsync: MobStoreEmitAsync;
    computed: MobStoreComputed;
    watch: MobStoreWatch;
    bindStore: BindStore;
    debug: () => void;
}
