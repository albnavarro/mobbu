import { handleFrame } from '../../../events/rafutils/handleFrame.js';
import { handleNextFrame } from '../../../events/rafutils/handleNextFrame.js';
import { handleCache } from '../../../events/rafutils/handleCache.js';
import { handleFrameIndex } from '../../../events/rafutils/handleFrameIndex.js';

/**
 *Callback while Running
 */
export const defaultCallback = ({
    stagger,
    callback,
    callbackCache,
    callBackObject,
    useStagger,
}) => {
    if (stagger.each === 0 || !useStagger) {
        handleFrame.add(() => {
            callback.forEach(({ cb }) => {
                cb(callBackObject);
            });
        });

        handleFrame.add(() => {
            callbackCache.forEach(({ cb }) => {
                handleCache.fireObject({ id: cb, obj: callBackObject });
            });
        });

        return;
    }

    // Stagger
    callback.forEach(({ cb, frame }) => {
        handleFrameIndex.add(() => {
            cb(callBackObject);
        }, frame);
    });

    callbackCache.forEach(({ cb, frame }) => {
        handleCache.update({ id: cb, callBackObject, frame });
    });
};

/**
 *Callback on complete
 */
export const defaultCallbackOnComplete = ({
    onComplete,
    callback,
    callbackCache,
    callbackOnComplete,
    callBackObject,
    stagger,
    slowlestStagger,
    fastestStagger,
    useStagger,
}) => {
    if (stagger.each === 0 || !useStagger) {
        onComplete();

        handleNextFrame.add(() => {
            // Fire callback with exact end value
            callback.forEach(({ cb }) => {
                cb(callBackObject);
            });

            callbackCache.forEach(({ cb }) => {
                handleCache.fireObject({ id: cb, obj: callBackObject });
            });

            callbackOnComplete.forEach(({ cb }) => {
                cb(callBackObject);
            });
        });

        return;
    }

    callback.forEach(({ cb, frame }, i) => {
        handleFrameIndex.add(() => {
            if (stagger.waitComplete) {
                if (i === slowlestStagger.index) {
                    cb(callBackObject);
                    onComplete();
                }
                return;
            }

            if (i === fastestStagger.index) {
                cb(callBackObject);
                onComplete();
            }
        }, frame);
    });

    callbackCache.forEach(({ cb, frame }, i) => {
        handleFrameIndex.add(() => {
            if (stagger.waitComplete) {
                if (i === slowlestStagger.index) {
                    handleCache.fireObject({ id: cb, obj: callBackObject });
                    onComplete();
                }
                return;
            }

            if (i === fastestStagger.index) {
                handleCache.fireObject({ id: cb, obj: callBackObject });
                onComplete();
            }
        }, frame);
    });

    callbackOnComplete.forEach(({ cb, frame }) => {
        handleFrameIndex.add(() => {
            cb(callBackObject);
        }, frame + 1);
    });
};
