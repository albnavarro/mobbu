import { mobCore } from '../../../mobCore';
import { mainStore, MAIN_STORE_BEFORE_ROUTE_CHANGE } from '../../../mobjs';

export const anchorStore = mobCore.createStore({
    items: () => ({
        value: [],
        type: Array,
    }),
    computedItems: () => ({
        value: [],
        type: Array,
    }),
    activeLabelFromObeserver: () => ({
        value: '',
        type: String,
    }),
});

/**
 * Await that all anchor is populated then update once.
 * Store is populated by spacer component.
 */
anchorStore.computed('computedItems', ['items'], (val) => {
    return val;
});

/**
 * Clean anchor on route change.
 */
mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, () => {
    anchorStore.set('items', []);
});
