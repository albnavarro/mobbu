import { SimpleStore } from '../../mobCore/store/simpleStore';
import {
    simpleStoreBaseData,
    simpleStoreComputedCallback,
    simpleStoreWatchCallbackType,
} from '../../mobCore/store/type';

export interface componentCommonTypes {
    key: string;
    currentRepeaterState?: {
        current: object;
        index: number;
    };
    isRepeater?: boolean;
    parentPropsWatcher?: function[];
    destroy: () => void;
    freezedPros?: string[];
    isCancellable: boolean;
    child?:
        | {
              string: string[];
          }
        | {};
    parentId: string | undefined;
    id: string;
}

export interface componentStoreTypes extends componentCommonTypes {
    element: HTMLElement;
    component: string;
    instanceName: string;
    state: SimpleStore;
}

export interface componentStoreInputTypes extends componentCommonTypes {
    component: HTMLElement;
    componentName: string;
    componentParsed: HTMLElement;
    instanceName: string;
    state: simpleStoreBaseData;
    props: object;
}

export interface componentStoreReturnType {
    getState: (arg0: string) => any;
    setState: (arg0: string, arg2: any, arg3: boolean) => void;
    emit: (arg0: string) => void;
    emitAsync: (arg0: string) => Promise;
    computed: (
        prop: string,
        keys: string[],
        callback: simpleStoreComputedCallback
    ) => void;
    watch: (
        propierties: string,
        callback: simpleStoreWatchCallbackType
    ) => void;
}
