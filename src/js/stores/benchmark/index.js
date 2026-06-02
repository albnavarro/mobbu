import { MobCore } from '@mobCore';
import { defaultAmountOfCard } from '@pagesComponent/benchmark/partials/definition-partial';

/**
 * @import {MobStoreParams} from '@mobStoreType'
 */

export const externalBenchmarkStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').ExternalStore>} */
    ({
        data: {
            __value: [
                ...Array.from({ length: defaultAmountOfCard }).keys(),
            ].map((item) => ({ label: `comp-${item + 1}` })),
            __type: Array,
            __validate: (value) => value.length < 1001,
            __strict: true,
            __skipEqual: false,
        },
        counter: {
            __value: 0,
            __type: Number,
        },
        time: {
            __value: 0,
            __type: Number,
            __transform: (value) => Math.round(value),
            __skipEqual: false,
        },
        isLoading: {
            __value: false,
            __type: Boolean,
        },
    })
);
