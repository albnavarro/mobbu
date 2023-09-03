// @ts-check

import { core } from '../../mobMotion';

export const mainStore = core.createStore({
    contentId: () => ({
        value: '',
        type: String,
    }),
    index: () => ({
        value: '',
        type: String,
    }),
    pageNotFound: () => ({
        value: '',
        type: String,
    }),
    componentList: () => ({
        value: {},
        type: 'any',
    }),
    routeList: () => ({
        value: {},
        type: 'any',
    }),
    propsToChildren: () => ({
        value: [],
        type: Array,
    }),
    dynamicPropsToChildren: () => ({
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
    parseComponentEvent: {
        element: () => ({
            value: document.createElement('div'),
            type: HTMLElement,
        }),
        runtimeId: () => ({
            value: '',
            type: String,
        }),
    },
    currentListValue: () => ({
        value: [],
        type: Array,
    }),
});
