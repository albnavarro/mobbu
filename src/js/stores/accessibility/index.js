/**
 * @import {MobStoreParams} from '@mobStoreType'
 */

import { MobCore } from '@mobCore';

export const accessibilityStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').accessibilityStore>} */
    ({
        accessibilityDialogOpen: {
            __value: false,
            ___type: Boolean,
        },
    })
);
