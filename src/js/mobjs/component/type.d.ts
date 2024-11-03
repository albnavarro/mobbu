import {
    computedType,
    emitAsyncType,
    emitType,
    getType,
    mobStoreBaseData,
    setType,
    updateType,
    watchType,
    MobStore,
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
    state: MobStore<any>;
    refs: Record<string, HTMLElement[]>;
    methods: Record<string, (...args: any[]) => void> | object;
}

export interface componentStoreInputTypes extends componentCommonTypes {
    componentName: string;
    element: HTMLElement | UserComponent;
    instanceName: string;
    state: mobStoreBaseData;
    props: object;
    refs?: Record<string, HTMLElement[]>;
    methods?: Record<string, (...args: any[]) => void> | object;
}

export interface componentStoreReturnType {
    getState: getType;
    setState: setType;
    updateState: updateType;
    emit: emitType;
    emitAsync: emitAsyncType;
    computed: computedType;
    watch: watchType;
    debug: () => void;
}
