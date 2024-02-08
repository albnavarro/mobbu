import { mobCore } from '../../../mobCore';
import { mainStore } from '../../../mobjs';

export const anchorStore = mobCore.createStore({
    items: () => ({
        value: [],
        type: Array,
    }),
    computedItems: () => ({
        value: [],
        type: Array,
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
mainStore.watch('beforeRouteChange', () => {
    anchorStore.set('items', []);
});
