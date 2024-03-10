export interface callbackObject<T> {
    cb: T;
    id: number;
    index: number;
    frame: number;
}

export interface setCallbackReturnObject {
    arrayOfCallbackUpdated: callbackObject<Function>[];
    unsubscribeCb: (
        arg0: callbackObject<Function>[]
    ) => callbackObject<Function>[];
}

export interface setCallbackCacheReturnObject {
    arrayOfCallbackUpdated: callbackObject<string>[];
    unsubscribeCache: Function[];
    unsubscribeCb: (arg0: callbackObject<string>[]) => callbackObject<string>[];
}
