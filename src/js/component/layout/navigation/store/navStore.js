//@ts-check

import { mobCore } from '../../../../mobCore';

/**
 * @description
 * Navigation store utils.
 *
 * @type {import('../../../../mobCore/store/type').mobStore<import('./type').NavigationStore>}
 */
export const navigationStore = mobCore.createStore({
    activeNavigationSection: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    navigationIsOpen: () => ({
        value: false,
        type: Boolean,
    }),
});
