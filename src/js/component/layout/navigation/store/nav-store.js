import { MobCore } from '@mobCore';

/**
 * @import {MobStoreParams} from "@mobStoreType";
 */

export const navigationStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').NavigationStore>} */
    ({
        activeNavigationSection: () => ({
            value: '',
            type: String,
            skipEqual: false,
        }),
        navigationIsOpen: () => ({
            value: false,
            type: Boolean,
        }),
    })
);

navigationStore.set('activeNavigationSection', '');
