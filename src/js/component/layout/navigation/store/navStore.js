//@ts-check

import { MobCore } from '../../../../mobCore';

/**
 * @import { MobStoreParams} from "../../../../mobCore/store/type".MobStore;
 **/

export const navigationStore = MobCore.createStore(
    /** @type{MobStoreParams<import('./type').NavigationStore>} */
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
