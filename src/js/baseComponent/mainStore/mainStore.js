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
    repeat: () => ({
        value: [],
        type: Array,
    }),
    activeRepeat: () => ({
        value: [],
        type: Array,
    }),
    activeParser: () => ({
        value: 0,
        type: Number,
    }),
    activeRoute: () => ({
        value: '',
        type: String,
    }),
    beforeRouteChange: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    atfterRouteChange: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
});
