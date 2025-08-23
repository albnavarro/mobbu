import { MobCore } from '@mobCore';

/**
 * @import {MobStoreParams} from "@mobStoreType";
 */

export const externalBenchmarkStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').ExternalStore>} */
    ({
        data: () => ({
            value: [],
            type: Array,
            validate: (value) => value.length < 1001,
            strict: true,
            skipEqual: false,
        }),
        counter: () => ({
            value: 0,
            type: Number,
        }),
        time: () => ({
            value: 0,
            type: Number,
            transform: (value) => Math.round(value),
            skipEqual: false,
        }),
        isLoading: () => ({
            value: false,
            type: Boolean,
        }),
    })
);
