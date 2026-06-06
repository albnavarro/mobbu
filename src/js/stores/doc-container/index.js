import { MobCore } from '@mobCore';

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
    })
);
