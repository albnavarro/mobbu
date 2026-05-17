/**
 * @import {MobStoreParams} from "@mobStoreType"
 */

import { MobCore } from '@mobCore';

export const myStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').MyStoreType>} */
    {
        prop1: {
            __value: 0,
            __type: Number,
        },
        prop2: {
            __value: [],
            __type: Array,
        },
    }
);
