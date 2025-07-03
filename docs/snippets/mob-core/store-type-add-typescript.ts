import { MobCore } from '@mobCore';
import { DebugActiveComponentStore } from './type';

export const debugActiveComponentStore = MobCore.createStore<MyStoreType>({
    prop1: () => ({
        value: 0,
        type: Number,
    }),
    prop2: () => ({
        value: [],
        type: Array,
    }),
});
