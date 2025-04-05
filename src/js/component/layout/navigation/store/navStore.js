//@ts-check

import { MobCore } from '../../../../mob/mobCore';

/**
 * @import { MobStoreParams} from "../../../../mob/mobCore/store/type".MobStore;
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
