import {
    computedType,
    emitAsyncType,
    emitType,
    getType,
    mobStoreBaseData,
    setType,
    watchType,
} from '../../mobCore/store/type';
import { storePublicMethods } from '../../mobCore/store/type';

export interface componentCommonTypes {
    key: string;
    currentRepeaterState?: {
        current: object;
        index: number;
    };
    isRepeater?: boolean;
    parentPropsWatcher?: Function[];
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
    componentName: string;
    instanceName: string;
    state: storePublicMethods;
}

export interface componentStoreInputTypes extends componentCommonTypes {
    componentName: string;
    element: HTMLElement;
    instanceName: string;
    state: mobStoreBaseData;
    props: object;
}

export interface componentStoreReturnType {
    getState: getType;
    setState: setType;
    emit: emitType;
    emitAsync: emitAsyncType;
    computed: computedType;
    watch: watchType;
}
