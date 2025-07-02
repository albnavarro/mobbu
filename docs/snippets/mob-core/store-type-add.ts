/**
 * @import {MobStoreParams} from '@mobStoreType';
 */

import { MobCore } from '@mobCore';

export const myStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').MyStore>} */
    ({
        prop1: () => ({
            value: 0,
            type: Number,
        }),
        prop2: () => ({
            value: [],
            type: Array,
        }),
    })
);
