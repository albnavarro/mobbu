import { MobCore } from '@mobCore';

/**
 * @import {MobStoreParams} from '@mobStoreType'
 */

export const navigationStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').NavigationStore>} */
    ({
        activeNavigationSection: {
            __value: '',
            __type: String,
            __skipEqual: false,
        },
        navigationIsOpen: {
            __value: false,
            __type: Boolean,
        },
    })
);

export const initNavigationStoreSet = () => {
    navigationStore.set('activeNavigationSection', '');
};
