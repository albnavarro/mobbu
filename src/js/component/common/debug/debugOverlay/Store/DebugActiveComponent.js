import { mobCore } from '../../../../../mobCore';

/** @type {import('../../../../../mobCore/store/type').MobStore<import('./type').DebugActiveComponentStore>} */
export const debugActiveComponentStore = mobCore.createStore({
    currentId: () => ({
        values: '',
        type: String,
    }),
});
