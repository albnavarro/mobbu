import { core } from '../../mobbu';

export const mainStore = core.createStore({
    propsToChildren: () => ({
        value: [],
        type: Array,
    }),
    onMountCallback: () => ({
        value: [],
        type: Array,
    }),
});
