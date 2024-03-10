import { simpleStoreBaseData } from '../../mobCore/store/type';
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
    component: string;
    instanceName: string;
    state: storePublicMethods;
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
    emitAsync: (arg0: string) => Promise<any>;
    computed: (prop: string, keys: string[], callback: () => void) => void;
    watch: (
        propierties: string,
        callback: (current: any, previous: any, validate: boolean) => void
    ) => void;
}
