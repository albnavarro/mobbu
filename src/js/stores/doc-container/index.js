import { MobCore } from '@mobCore';
import { MobMotionCore } from '@mobMotion';

/**
 * @import {MobStoreParams} from '@mobStoreType'
 */

export const docContainerStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').DocContainerStore>} */
    ({
        shouldApplyInert: {
            __value: true,
            __type: Boolean,
            __skipEqual: false,
        },
        leftSidebarIsVisible: {
            __value: MobMotionCore.mq('min', 'desktop') ? true : false,
            __type: Boolean,
            __skipEqual: false,
        },
    })
);
