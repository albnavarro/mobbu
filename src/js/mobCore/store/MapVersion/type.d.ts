// @ts-check

export type storeMap = Map<string, storeMapValue>;

export interface storeMapValue {
    callBackWatcher: Map<string, { prop: string; fn: Function }>;
    callBackComputed: Set<{ prop: string; fn: Function; keys: string[] }>;
    computedPropFired: Set<string>;
    computedWaitList: Set<string>;
    validationStatusObject: {
        [key: string]: boolean | { [key: string]: boolean };
    };
    dataDepth: number;
    computedRunning: boolean;
    store: {
        [key: string]: any | { [key: string]: any };
    };
    type: {
        [key: string]:
            | simpleStoreTypeNative
            | simpleStoreTypeAlias
            | {
                  [key: string]: simpleStoreTypeNative | simpleStoreTypeAlias;
              };
    };
    fnValidate: {
        [key: string]:
            | Function
            | {
                  [key: string]: Function;
              };
    };
    strict: {
        [key: string]:
            | boolean
            | {
                  [key: string]: boolean;
              };
    };
    skipEqual: {
        [key: string]:
            | boolean
            | {
                  [key: string]: boolean;
              };
    };
}

export interface storePublicMethods {
    get: (arg0: string) => any;
    getProp: (arg0: string) => any;
    set: (
        prop: string,
        value: any | ((arg0: any) => any),
        fireCallback?: boolean,
        clone?: boolean
    ) => any;
    watch: (prop: string, callback: () => void) => () => void;
    emit: (props: string) => void;
    emitAsync: (props: string) => Promise<{ success: boolean }>;
    getValidation: () => Object;
    debugStore: () => void;
    debugValidate: () => void;
    destroy: () => void;
}

export type simpleStoreTypeAlias =
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

export type simpleStoreTypeNative =
    | String
    | Number
    | Object
    | Function
    | Array<any>
    | Boolean
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

export interface storeSetAction extends storeSet {
    state: storeMapValue;
}

export interface storeWatch {
    prop: string;
    callback: () => void;
}

export interface storeWatchAction extends storeWatch {
    state: storeMapValue;
}

export interface storeWatchReturnObject {
    state: storeMapValue | undefined;
    unsubscribeId: string;
}

export interface callbackQueue {
    callBackWatcher: Map<string, { prop: string; fn: Function }>;
    prop: string;
    newValue: any;
    oldValue: any;
    validationValue: boolean | { [key: string]: boolean };
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
     * Validation function to parse value.
     * This function will have the current value and old value as input parameter and will return a boolean value.
     * The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.
     */
    validate?: (arg0: any, arg1: any) => boolean;

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

export interface simpleStoreBaseData {
    [key: string]:
        | simpleStoreCustomValue
        | number
        | string
        | object
        | simpleStoreBaseData;
}

export type simpleStoreWatchCallbackType = (
    newValue: any,
    oldValue: any,
    validationValue: boolean | { [key: string]: boolean }
) => void;

export type simpleStoreComputedCallback = (arg0: any, arg1: any) => void;
