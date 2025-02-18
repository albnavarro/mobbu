import { mobCore } from '../../../../mobCore';

/**
 * @import { MobStoreParams} from "../../../../mobCore/store/type".MobStore;
 **/

/** @type {import('../../../../mobCore/store/type').MobStoreReturnType<import('./type').ExternalStore>} */
let externalStore;

export const createExternalStore = () => {
    if (externalStore) return;

    externalStore = mobCore.createStore(
        /** @type{MobStoreParams<import('./type').ExternalStore>} */
        ({
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
        })
    );
};

export const getExternalStore = () => externalStore;

export const destroyExternalStore = () => {
    externalStore.destroy();
    // @ts-ignore
    externalStore = null;
};
