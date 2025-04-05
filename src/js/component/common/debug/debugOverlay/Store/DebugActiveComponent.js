/**
 * @import { MobStoreParams } from '../../../../../mob/mobCore/store/type';
 **/

import { MobCore } from '../../../../../mob/mobCore';

export const debugActiveComponentStore = MobCore.createStore(
    /** @type{MobStoreParams<import('./type').DebugActiveComponentStore>} */
    ({
        currentId: () => ({
            value: '',
            type: String,
        }),
    })
);
