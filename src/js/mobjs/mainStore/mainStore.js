import { core } from '../../mobbu';

export const mainStore = core.createStore({
    root: () => ({
        value: document.createElement('div'),
        type: Element,
    }),
    componentList: () => ({
        value: [],
        type: Array,
    }),
    routeList: () => ({
        value: [],
        type: Array,
    }),
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
    beforeRouteLeave: () => ({
        value: '',
        type: String,
        skipEqual: false,
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
