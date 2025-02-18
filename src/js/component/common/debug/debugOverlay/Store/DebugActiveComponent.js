/**
 * @import { MobStoreParams } from '../../../../../mobCore/store/type';
 **/

import { mobCore } from '../../../../../mobCore';

export const debugActiveComponentStore = mobCore.createStore(
    /** @type{MobStoreParams<import('./type').DebugActiveComponentStore>} */
    ({
        currentId: () => ({
            value: '',
            type: String,
        }),
    })
);
