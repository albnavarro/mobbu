import {
    computedType,
    emitAsyncType,
    emitType,
    getType,
    MobStoreParams,
    setType,
    updateType,
    watchType,
    MobStoreReturnType,
    storeProxiType,
    bindStoreType,
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
    getState: getType;
    setState: setType;
    updateState: updateType;
    getProxi: storeProxiType;
    emit: emitType;
    emitAsync: emitAsyncType;
    computed: computedType;
    watch: watchType;
    bindStore: bindStoreType;
    debug: () => void;
}
