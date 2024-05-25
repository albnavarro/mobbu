export interface callbackObject<T> {
    cb: T;
    id: number;
    index: number;
    frame: number;
}

export interface setCallbackReturnObject {
    arrayOfCallbackUpdated: callbackObject<() => void>[];
    unsubscribeCb: (
        arg0: callbackObject<() => void>[]
    ) => callbackObject<() => void>[];
}

export interface setCallbackCacheReturnObject {
    arrayOfCallbackUpdated: callbackObject<string>[];
    unsubscribeCache: (() => void)[];
    unsubscribeCb: (arg0: callbackObject<string>[]) => callbackObject<string>[];
}
