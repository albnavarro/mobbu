/**
 * @import { MobStore } from '../../../../../mobCore/store/type';
 **/

import { mobCore } from '../../../../../mobCore';

/** @type {MobStore<import('./type').DebugActiveComponentStore>} */
export const debugActiveComponentStore = mobCore.createStore({
    currentId: () => ({
        values: '',
        type: String,
    }),
});
