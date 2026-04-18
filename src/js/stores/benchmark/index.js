import { MobCore } from '@mobCore';
import { defaultAmountOfCard } from '@pagesComponent/benchmark/partials/definition-partial';

/**
 * @import {MobStoreParams} from "@mobStoreType"
 */

export const externalBenchmarkStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').ExternalStore>} */
    ({
        data: () => ({
            value: [...Array.from({ length: defaultAmountOfCard }).keys()].map(
                (item) => ({ label: `comp-${item + 1}` })
            ),
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
