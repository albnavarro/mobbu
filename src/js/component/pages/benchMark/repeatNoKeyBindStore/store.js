import { mobCore } from '../../../../mobCore';

/** @type {import('../../../../mobCore/store/type').MobStore<import('./type').ExternalStore>} */
let externalStore;

export const createExternalStore = () => {
    externalStore = mobCore.createStore({
        data: () => ({
            value: [],
            type: Array,
            validate: (value) => value.length < 2000,
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
    });
};

export const getExternalStore = () => externalStore;
