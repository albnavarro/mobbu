import {
    computedType,
    emitAsyncType,
    emitType,
    getType,
    mobStoreBaseData,
    setType,
    watchType,
} from '../../mobCore/store/type';
import { mobStore } from '../../mobCore/store/type';
import { userComponent } from '../webComponent/type';

export interface componentCommonTypes {
    key: string;
    currentRepeaterState?: {
        current: object;
        index: number;
    };
    isRepeater?: boolean;
    parentPropsWatcher?: (() => void)[];
    destroy?: () => void;
    freezedPros?: string[];
    isCancellable: boolean;
    child?:
        | {
              string: string[];
          }
        | object;
    parentId: string | undefined;
    id: string;
}

export interface componentStoreTypes extends componentCommonTypes {
    element: HTMLElement | userComponent;
    componentName: string;
    instanceName: string;
    state: mobStore;
}

export interface componentStoreInputTypes extends componentCommonTypes {
    componentName: string;
    element: HTMLElement | userComponent;
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
