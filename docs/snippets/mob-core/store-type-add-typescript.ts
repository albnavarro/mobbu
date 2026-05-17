import { MobCore } from '@mobCore';
import { DebugActiveComponentStore } from './type';

export const debugActiveComponentStore = MobCore.createStore<MyStoreType>({
    prop1: {
        __value: 0,
        __type: Number,
    },
    prop2: {
        __value: [],
        __type: Array,
    },
});
