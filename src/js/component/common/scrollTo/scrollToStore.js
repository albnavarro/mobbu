import { mobCore } from '../../../mobCore';
import { mainStore, MAIN_STORE_BEFORE_ROUTE_CHANGE } from '../../../mobjs';

export const anchorStore = mobCore.createStore({
    items: () => ({
        value: [],
        type: Array,
    }),
    activeLabelFromObeserver: () => ({
        value: '',
        type: String,
    }),
});

/**
 * Clean anchor on route change.
 */
mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, () => {
    anchorStore.set('items', []);
});
