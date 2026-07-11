import { MobCore } from '@mobCore';
import { MobMotionCore } from '@mobMotion';

/**
 * @import {MobStoreParams} from '@mobStoreType'
 */

const mqObject = MobMotionCore.getDefault('mq');

export const mqKeys = /** @type{import('./type').MqKeys[]} */ (
    Object.keys(mqObject)
);

/**
 * @returns {import('./type').MqKeys}
 */
const getCurrentMq = () =>
    mqKeys.findLast((key) => MobMotionCore.mq('min', key)) ?? 'desktop';

/**
 * @returns {boolean}
 */
const getFromTablet = () =>
    ['tablet', 'desktop', 'large', 'xLarge', 'xxLarge'].some((key) =>
        MobMotionCore.mq('min', key)
    );

export const mqStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').MqStore>} */
    ({
        mq: {
            __value: getCurrentMq(),
            __type: String,
        },
        fromTablet: {
            __value: getFromTablet(),
            __type: Boolean,
        },
    })
);

export const initMqStoreResize = () => {
    MobCore.useResize(() => {
        mqStore.set('mq', getCurrentMq());
        mqStore.set('fromTablet', getFromTablet());
    });
};
