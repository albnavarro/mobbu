//@ts-check

import { mobCore } from '../../../../mobCore';

/**
 * @import {MobStore, MobStoreBaseData} from "../../../../mobCore/store/type".MobStore;
 **/

/**
 * @description
 * Navigation store utils.
 *
 * @type {MobStore<import('./type').NavigationStore>}
 */
export const navigationStore = mobCore.createStore(
    /** @type{MobStoreBaseData<import('./type').NavigationStore>} */
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
