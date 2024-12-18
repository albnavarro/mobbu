export type OnlyStringKey<T> = Extract<keyof T, string>;
export type NotValue<T, K> = T extends K ? never : T;

export type storeMap = Map<string, storeMapValue>;

export type validateState = boolean | Record<string, boolean>;

export interface storeMapValue {
    callBackWatcher: Map<
        string,
        {
            prop: string;
            fn: (current: any, previous: any, validate: validateState) => void;
        }
    >;
    callBackComputed: Set<{
        prop: string;
        fn: (arg0: Record<string, any>) => void;
        keys: string[];
    }>;
    computedPropsQueque: Set<string>;
    validationStatusObject: Record<string, validateState>;
    dataDepth: number;
    computedRunning: boolean;
    store: Record<string, any | Record<string, any>>;
    type: Record<
        string,
        | mobStoreTypeNative
        | mobStoreTypeAlias
        | Record<string, mobStoreTypeNative | mobStoreTypeAlias>
    >;
    fnTransformation: Record<
        string,
        | ((current: any, previous: any) => any)
        | Record<string, (current: any, previous: any) => any>
    >;
    fnValidate: Record<string, (() => boolean) | Record<string, () => boolean>>;
    strict: Record<string, boolean | Record<string, boolean>>;
    skipEqual: Record<string, boolean | Record<string, boolean>>;
    proxiObject?: Record<string, any>;
}

/**
 * Main component.
 */
type StoreDefaultMap = Record<string, any>;

export interface MobStore<T extends StoreDefaultMap> {
    get: getType<T>;
    getProp: getPropType<T>;
    set: setType<T>;
    update: updateType<T>;
    quickSetProp: quickSetPropType<T>;
    watch: watchType<T>;
    computed: computedType<T>;
    emit: emitType<T>;
    emitAsync: emitAsyncType<T>;
    getProxi: storeProxiType<T>;
    getValidation: () => object;
    debug: () => void;
    debugStore: () => void;
    debugValidate: () => void;
    destroy: () => void;
}

export type getType<T> = () => T;

export type getPropType<T> = <K extends keyof T>(
    arg0: Extract<K, string>
) => T[K];

export type setType<T> = <K extends keyof T>(
    prop: Extract<K, string>,
    value: T[K],
    options?: {
        emit?: boolean;
    }
) => void;

export type updateType<T> = <K extends keyof T>(
    prop: Extract<K, string>,
    value: (arg0: T[K]) => T[K],
    options?: {
        emit?: boolean;
        clone?: boolean;
    }
) => void;

export type quickSetPropType<T> = <K extends keyof T>(
    prop: Extract<K, string>,
    value: T[K]
) => void;

export type watchType<T> = <K extends keyof T>(
    prop: Extract<K, string>,
    callback: (current: T[K], previous: T[K], validate: validateState) => void
) => () => void;

export type computedType<T> = <K extends keyof T>(
    prop: Extract<K, string>,
    keys: Extract<keyof T, string>[],
    callback: (arg0: T) => T[K]
) => void;

export type emitType<T> = (props: Extract<keyof T, string>) => void;

export type emitAsyncType<T> = (
    props: Extract<keyof T, string>
) => Promise<{ success: boolean }>;

export type storeProxiType<T> = () => T;

export type mobStoreTypeAlias =
    | 'String'
    | 'Number'
    | 'Object'
    | 'Function'
    | 'Array'
    | 'Boolean'
    | 'Element'
    | 'Map'
    | 'Set'
    | 'NodeList'
    | 'Any';

export type mobStoreTypeNative =
    | string
    | number
    | object
    | (() => void)
    | any[]
    | boolean
    | Element
    | Map<any, any>
    | Set<any>
    | NodeList;

export interface storeSet {
    prop: string;
    value: any | ((arg0: any) => any);
    fireCallback?: boolean;
    clone?: boolean;
}

export interface storeSetEntryPoint {
    instanceId: string;
    prop: string;
    value: any | ((arg0: any) => any);
    fireCallback?: boolean;
    clone?: boolean;
    action: 'SET' | 'UPDATE';
}

export interface storeSetAction extends storeSet {
    instanceId: string;
    useStrict?: boolean;
    state: storeMapValue;
    action: 'SET' | 'UPDATE';
}

export interface storeQuickSetEntryPoint {
    instanceId: string;
    prop: string;
    value: any | ((arg0: any) => any);
}

export interface storeWatch {
    prop: string;
    callback: (current: any, previous: any, validate: validateState) => void;
}

export interface storeWatchAction extends storeWatch {
    state: storeMapValue;
}

export interface storeWatchReturnObject {
    state: storeMapValue | undefined;
    unsubscribeId: string;
}

export interface storeComputed {
    prop: string;
    keys: string[];
    fn: (arg0: Record<string, any>) => void;
}

export interface storeComputedAction extends storeComputed {
    state: storeMapValue;
}

export interface callbackQueue {
    callBackWatcher: Map<
        string,
        {
            prop: string;
            fn: (
                arg0: any,
                arg1: any,
                arg2: boolean | Record<string, boolean>
            ) => void | Promise<void>;
        }
    >;
    prop: string;
    newValue: any;
    oldValue: any;
    validationValue: boolean | Record<string, boolean>;
}

export type simpleStoreCustomValue = () => {
    /**
     * @description
     * Initial value
     */
    value: any;

    /**
     * @description
     *  Supported types:
     * `String|Number|Object|Function|Array|Boolean|Element|HTMLElement|Map|Set|NodeList|"Any"`.
     *  The property will not be updated if it doesn't match, you will have a warning.
     *  For custom Object use 'Any'.
     *  Support Constructor || String.
     *  Es: type: Number || type: 'Number'
     */
    type?: any;

    /**
     * @description
     * Function to transform value.
     * This function will have the current value and old value as input parameter.
     */
    transform?: (value: any, previousValue: any) => boolean;

    /**
     * @description
     * Validation function to parse value.
     * This function will have the current value and old value as input parameter and will return a boolean value.
     * The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.
     */
    validate?: (value: any, previousValue: any) => boolean;

    /**
     * @description
     * If set to true, the validation function will become blocking and the property will be updated only if the validation function is successful.
     * THe default value is `false`.
     */
    strict?: boolean;

    /**
     * @description
     * If the value is equal to the previous one, the property will not be updated. The watches will not be executed and the property will have no effect on the computed related to it.
     * The default value is `true`.
     */
    skipEqual?: boolean;
};

export interface mobStoreBaseData {
    [key: string]:
        | simpleStoreCustomValue
        | mobStoreTypeNative
        | mobStoreBaseData;
}
