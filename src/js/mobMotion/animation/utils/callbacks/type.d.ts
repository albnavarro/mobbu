export interface callbackObject<T> {
    cb: T;
    id: number;
    index: number;
    frame: number;
}

export interface setCallbackReturnObject {
    arrayOfCallbackUpdated: callbackObject<
        (arg0: Record<string, number>) => void
    >[];
    unsubscribeCb: (
        arg0: callbackObject<(arg0: Record<string, number>) => void>[]
    ) => callbackObject<(arg0: Record<string, number>) => void>[];
}

export interface setCallbackCacheReturnObject {
    arrayOfCallbackUpdated: callbackObject<string>[];
    unsubscribeCache: (() => void)[];
    unsubscribeCb: (arg0: callbackObject<string>[]) => callbackObject<string>[];
}
