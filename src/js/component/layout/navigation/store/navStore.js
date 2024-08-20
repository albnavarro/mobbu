//@ts-check

import { mobCore } from '../../../../mobCore';

/**
 * No operation.
 * Use to trigger event with emit method.
 */
const NOOP = () => {};

/**
 * @description
 * Navigation store utils.
 *
 * @type {import('../../../../mobCore/store/type').mobStore<import('./type').NavigationStore>}
 */
export const navigationStore = mobCore.createStore({
    refreshScroller: NOOP,
    openNavigation: NOOP,
    closeNavigation: NOOP,
    activeSection: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    navigationIsOpen: () => ({
        value: false,
        type: Boolean,
    }),
});
