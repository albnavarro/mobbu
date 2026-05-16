/**
 * @import {MobStoreParams} from "@mobStoreType"
 */

import { MobCore } from '@mobCore';

export const debugActiveComponentStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').DebugActiveComponentStore>} */
    ({
        currentId: {
            __value: '',
            ___type: String,
        },
    })
);
